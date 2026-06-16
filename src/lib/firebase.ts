import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQjTVyP57NVWiwsfFgvnV76WqbTjvB0Zk",
  authDomain:"sarkar-saathi.firebaseapp.com",
  projectId:"sarkar-saathi",
  storageBucket:"sarkar-saathi.firebasestorage.app",
  messagingSenderId:"151055206795",
  appId:"1:151055206795:web:96d8ee0781f15067cc878e",
  measurementId: "G-804MY4C2L3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();