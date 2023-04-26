// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQeqEXhEhrXH6TC2Btuwmswqa-7HfDNww",
  authDomain: "chatapp-640fb.firebaseapp.com",
  projectId: "chatapp-640fb",
  storageBucket: "chatapp-640fb.appspot.com",
  messagingSenderId: "74010901908",
  appId: "1:74010901908:web:387abcfebaac90311ee381"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)