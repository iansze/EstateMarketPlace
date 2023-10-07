// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "estate-9cf4b.firebaseapp.com",
  projectId: "estate-9cf4b",
  storageBucket: "estate-9cf4b.appspot.com",
  messagingSenderId: "212402529217",
  appId: "1:212402529217:web:c0b3b708e60a9bcfdbc540",
  measurementId: "G-MB89BESKFY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
