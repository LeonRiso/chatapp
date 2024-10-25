// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database'; // Import for Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW2sYMBVvRZehPp4mUAKabc9KAYrGK7bI",
  authDomain: "chatapp-da724.firebaseapp.com",
  databaseURL: "https://chatapp-da724-default-rtdb.firebaseio.com",
  projectId: "chatapp-da724",
  storageBucket: "chatapp-da724.appspot.com",
  messagingSenderId: "16145047049",
  appId: "1:16145047049:web:d3f7c0669d40660959a2d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const realtimeDb = getDatabase(app); // Initialize Realtime Database

// Export services
export { db, auth, storage, realtimeDb };
