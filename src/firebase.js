// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAGKMfsX9bct_JqQfm20Ye2b6Sba7KrT_s",
    authDomain: "voyagebuddydatabase.firebaseapp.com",
    projectId: "voyagebuddydatabase",
    storageBucket: "voyagebuddydatabase.appspot.com",
    messagingSenderId: "799345049481",
    appId: "1:799345049481:web:3cfa638232a26172de2b58",
    measurementId: "G-P1635E5QH9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firestore = getStorage(app);
const provider = new GoogleAuthProvider();

export { app,auth, db, firestore, provider };