// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCfpBNi3V77e2aaCUOfffXuRrAyr3ECUy0",
  authDomain: "alter-5de16.firebaseapp.com",
  projectId: "alter-5de16",
  storageBucket: "alter-5de16.appspot.com",
  messagingSenderId: "463574980183",
  appId: "1:463574980183:web:d5f41305d9549396b8b512",
  measurementId: "G-4J2LMR6B01"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Reference to the 'forms' collection in Firestore
const formsCollection = collection(db, 'forms');

export { db, analytics, formsCollection };
