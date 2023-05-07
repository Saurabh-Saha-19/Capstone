// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbjXKXBWmxETsreYPlKA5ZbSEfYP0ujaQ",
  authDomain: "creativegram-cf3b3.firebaseapp.com",
  projectId: "creativegram-cf3b3",
  storageBucket: "creativegram-cf3b3.appspot.com",
  messagingSenderId: "118849484664",
  appId: "1:118849484664:web:9e7dbca7521143abf17a8d",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
