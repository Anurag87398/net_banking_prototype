// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-bank-64c21.firebaseapp.com",
  projectId: "react-bank-64c21",
  storageBucket: "react-bank-64c21.appspot.com",
  messagingSenderId: "507001421481",
  appId: "1:507001421481:web:6f74a1f0c3177acb84b3b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
const auth= getAuth(app);

export {auth, db};