// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcTS8ri021wuKEl9TTEh-hTn3dGB42-Mw",
  authDomain: "ticketscan-dev.firebaseapp.com",
  projectId: "ticketscan-dev",
  storageBucket: "ticketscan-dev.appspot.com",
  messagingSenderId: "457406718516",
  appId: "1:457406718516:web:e571e2d883456146e46061",
  measurementId: "G-SPV1K7T7GE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);
