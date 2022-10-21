import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaLwv-Z-GCWBufHBdMt4QxPD6Hf6TDeBs",
    authDomain: "todo-list-1ac93.firebaseapp.com",
    databaseURL: "https://todo-list-1ac93-default-rtdb.firebaseio.com",
    projectId: "todo-list-1ac93",
    storageBucket: "todo-list-1ac93.appspot.com",
    messagingSenderId: "70364251817",
    appId: "1:70364251817:web:75c4aed876d99532720bb8",
    measurementId: "G-CQ9PZ7VYBR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };