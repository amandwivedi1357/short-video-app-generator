// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "clipverse-72194.firebaseapp.com",
  projectId: "clipverse-72194",
  storageBucket: "clipverse-72194.appspot.com",
  messagingSenderId: "929229733371",
  appId: "1:929229733371:web:0e8d6b799a6c80d80b5f5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)