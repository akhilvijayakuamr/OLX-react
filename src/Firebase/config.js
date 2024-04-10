import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'






const firebaseConfig = {
    apiKey: "AIzaSyCgNwzhO1DJZ2WiBRIqcFD39vif1AtBN1A",
    authDomain: "olx-clone-17277.firebaseapp.com",
    projectId: "olx-clone-17277",
    storageBucket: "olx-clone-17277.appspot.com",
    messagingSenderId: "305151202629",
    appId: "1:305151202629:web:e6e48d1f45360fb924da2c",
    measurementId: "G-J7VMJN27WP"
  };



export const firebase = initializeApp(firebaseConfig)

