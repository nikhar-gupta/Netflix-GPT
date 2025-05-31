// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflixgpt-7030.firebaseapp.com",
  projectId: "netflixgpt-7030",
  storageBucket: "netflixgpt-7030.firebasestorage.app",
  messagingSenderId: "704095352489",
  appId: "1:704095352489:web:56342fa2acfa41be521bb8",
  measurementId: "G-E2FPH3GWD4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
