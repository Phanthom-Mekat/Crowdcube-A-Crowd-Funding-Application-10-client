// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_F9UJyIznHD0EvdqiwE6bLPiGKdWOcqo",
  authDomain: "crowdfund-f95eb.firebaseapp.com",
  projectId: "crowdfund-f95eb",
  storageBucket: "crowdfund-f95eb.firebasestorage.app",
  messagingSenderId: "809129115798",
  appId: "1:809129115798:web:413620cf0524fa16f8c2b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);