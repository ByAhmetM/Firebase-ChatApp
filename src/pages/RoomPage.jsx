const RoomPage = ({ setIsAuth, setRoom }) => {
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("TOKEN");
  };
  return (
    <form className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Gireceksiniz?</p>
      <div className="room-button">
        <button onClick={() => setRoom("genel")}>Genel</button>
        <button onClick={() => setRoom("siyaset")}>Siyaset</button>
        <button onClick={() => setRoom("spor")}>Spor</button>
        <button onClick={() => setRoom("egitim")}>Eğitim</button>
      </div>
      <button type="button" onClick={logout}>
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPage;
