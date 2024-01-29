// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdQmB3crPAlbm0tSaHfxJAy2Q3tcrgW5k",
  authDomain: "hayditanis.firebaseapp.com",
  projectId: "hayditanis",
  storageBucket: "hayditanis.appspot.com",
  messagingSenderId: "989077060872",
  appId: "1:989077060872:web:7fd677ff3ebf2df9ac00bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
