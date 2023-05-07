// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_sAyCiiQ4B7miyv6I1Ya7YCXJJlXKy1w",
  authDomain: "i-kreative.firebaseapp.com",
  projectId: "i-kreative",
  storageBucket: "i-kreative.appspot.com",
  messagingSenderId: "140775994821",
  appId: "1:140775994821:web:b263363d02bcd7c86587ac",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
