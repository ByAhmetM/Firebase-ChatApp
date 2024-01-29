import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";
const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("TOKEN"));
  const [room, setRoom] = useState(null);

  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
  }

  return (
    <div className="container ">
      {room ? (
        <ChatPage room={room} setRoom={setRoom} />
      ) : (
        <RoomPage setIsAuth={setIsAuth} setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
