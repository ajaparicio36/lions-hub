// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
