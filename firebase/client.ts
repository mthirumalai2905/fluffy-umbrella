// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9yOA99atVc4Ioei9UCCOTtX7t7qJS9dw",
  authDomain: "prepwise-fb49c.firebaseapp.com",
  projectId: "prepwise-fb49c",
  storageBucket: "prepwise-fb49c.firebasestorage.app",
  messagingSenderId: "264126011355",
  appId: "1:264126011355:web:45eda13c294e9d509ab9fe",
  measurementId: "G-QN8518C5YM"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);