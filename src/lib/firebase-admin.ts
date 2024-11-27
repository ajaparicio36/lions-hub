import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const clientCredentials = {
  apiKey: "AIzaSyAGknD_tLyeBYKYTufxonPhdv7niNxIYvk",
  authDomain: "lions-hub.firebaseapp.com",
  projectId: "lions-hub",
  storageBucket: "lions-hub.firebasestorage.app",
  messagingSenderId: "775369091689",
  appId: "1:775369091689:web:23b9adbc6ea891157810f8",
  measurementId: "G-9PP2FNF7KD",
};

// Initialize Firebase Admin
const adminCredentials = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!getApps().length) {
  initializeApp({
    credential: cert(adminCredentials),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

export const auth = getAuth();
export const db = getFirestore();

// Client-side Firebase initialization
import { initializeApp as initializeClientApp } from "firebase/app";
import { getAuth as getClientAuth } from "firebase/auth";
import { getFirestore as getClientFirestore } from "firebase/firestore";

export const clientApp = initializeClientApp(clientCredentials);
export const clientAuth = getClientAuth(clientApp);
export const clientDb = getClientFirestore(clientApp);
