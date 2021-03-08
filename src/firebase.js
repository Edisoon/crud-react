import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDRuUjbOw20pRxFSlQAtxWgRoojyNnv0L8",
    authDomain: "crud-8f3c6.firebaseapp.com",
    projectId: "crud-8f3c6",
    storageBucket: "crud-8f3c6.appspot.com",
    messagingSenderId: "303964292478",
    appId: "1:303964292478:web:10d0208a50d6df98761f2f"
  }

  export const firebaseapp = firebase.initializeApp(firebaseConfig)