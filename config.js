import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBsGyuPLutJdqUKg-wdPxi1_RG8_TKrM2s",
  authDomain: "todos-654fc.firebaseapp.com",
  projectId: "todos-654fc",
  storageBucket: "todos-654fc.appspot.com",
  messagingSenderId: "1093447888430",
  appId: "1:1093447888430:web:eb9234e886b1eeacc3b9bf",
  measurementId: "G-FF20KH6LZV"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
