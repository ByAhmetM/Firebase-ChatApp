import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { useState } from "react";
import { toast } from "react-toastify";

const AuthPage = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [forgetPass, setForgetPass] = useState(false);

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        localStorage.setItem("TOKEN", res.user.refreshToken);
        setIsAuth(true);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Başarıyla kayıt olundu."), setIsAuth(true);
        })
        .catch((err) =>
          toast.error(`Kayıt olurken bir sorun oluştu. ${err.code}`)
        );
    } else {
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Başarıyla giriş yapıldı."), setIsAuth(true);
        })
        .catch((err) => {
          toast.error(`Giriş yapılırken bir sorun oluştu. ${err.code}`),
            setForgetPass(true);
        });
    }
  };

  const forgetPassFonk = () => {
    sendPasswordResetEmail(auth, email)
      .then(() =>
        toast.success("Şifre sıfırlama mailiniz başarıyla gönderildi.")
      )
      .catch(() => toast.error("Hata oluştu."));
  };

  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Odası</h1>
        <p>Devam etmek için giriş yapın</p>
        <button onClick={handleClick}>
          <img src="./g-logo.png" />
          <span>Google İle Gir</span>
        </button>
        <form onSubmit={handleSubmit} className="email-form">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="emailinizi giriniz"
          />
          <input onChange={(e) => setPass(e.target.value)} type="password" />
          <button type="submit">{isSignIn ? "Giriş Yap" : "Kayıt Ol"}</button>
        </form>
        {isSignIn ? (
          <p className="signin">
            Hesabınız yoksa
            <span onClick={() => setIsSignIn(false)}> Kayıt olun</span>
          </p>
        ) : (
          <p className="signin">
            Hesabınız varsa
            <span onClick={() => setIsSignIn(true)}> Giriş Yapın</span>
          </p>
        )}
        {forgetPass && (
          <p onClick={forgetPassFonk} className="forgetPass">
            Şifrenizi unuttuysanız tıklayınız.
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
