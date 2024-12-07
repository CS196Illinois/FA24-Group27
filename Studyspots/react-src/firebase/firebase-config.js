// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfyHPb80QwU2d_-WeLN5qwWfgD2sQ1eRc",
  authDomain: "study-spots-73987.firebaseapp.com",
  projectId: "study-spots-73987",
  storageBucket: "study-spots-73987.firebasestorage.app",
  messagingSenderId: "838423387566",
  appId: "1:838423387566:web:2d717eaf62a49025977c3f",
  measurementId: "G-1TGKEX2569"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()