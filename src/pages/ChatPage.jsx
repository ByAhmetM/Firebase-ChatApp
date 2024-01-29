import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "./../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  const messagesCol = collection(db, "messages");

  const queryOption = query(
    messagesCol,
    where("room", "==", room),
    orderBy("createdAt", "asc")
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    await addDoc(messagesCol, {
      text,
      room,
      author: {
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
    e.target.reset();
  };

  useEffect(() => {
    const unsub = onSnapshot(queryOption, (snapshot) => {
      const tempMsg = [];
      snapshot?.docs?.forEach((doc) => tempMsg.push(doc.data()));
      setMessages(tempMsg);
    });

    return () => unsub();
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Mesajınızı yazınız..." required />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
