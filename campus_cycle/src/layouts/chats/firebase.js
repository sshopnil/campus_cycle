// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyDJdVcHKcJipp0lnTay_RWUm42qSz5e8iE",
  
    authDomain: "campuscyclechat.firebaseapp.com",
  
    databaseURL: "https://campuscyclechat-default-rtdb.firebaseio.com",
  
    projectId: "campuscyclechat",
  
    storageBucket: "campuscyclechat.appspot.com",
  
    messagingSenderId: "695280774254",
  
    appId: "1:695280774254:web:b077b69da471dd4a2b4a7f",
  
    measurementId: "G-FD7SNYK3KD"
  
  };
  


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
