// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlszimD_kJl3gvig5Kp9-sA-Iq7vapQ6U",
  authDomain: "ticketscann.firebaseapp.com",
  projectId: "ticketscann",
  storageBucket: "ticketscann.appspot.com",
  messagingSenderId: "425710992126",
  appId: "1:425710992126:web:476972027670f4bdeb43af",
  measurementId: "G-LT0B306Y3B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);