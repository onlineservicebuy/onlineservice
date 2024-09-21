import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA5xa2nCjmT1aM3SiwurU9fMdrKMFFMfFs",
    authDomain: "online-service-c1069.firebaseapp.com",
    projectId: "online-service-c1069",
    storageBucket: "online-service-c1069.appspot.com",
    messagingSenderId: "728664800705",
    appId: "1:728664800705:web:83b0ee08f75798464f8340",
    measurementId: "G-JG3DF4DW5F"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };



