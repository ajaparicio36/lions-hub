// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGknD_tLyeBYKYTufxonPhdv7niNxIYvk",
  authDomain: "lions-hub.firebaseapp.com",
  projectId: "lions-hub",
  storageBucket: "lions-hub.firebasestorage.app",
  messagingSenderId: "775369091689",
  appId: "1:775369091689:web:23b9adbc6ea891157810f8",
  measurementId: "G-9PP2FNF7KD",
};

// Initialize Firebase
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Set session persistence
setPersistence(auth, browserSessionPersistence);

export { app, auth, db };
