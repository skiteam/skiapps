import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDppEeExWNKucC9DtG10Qk6IFbVnyoNbqE",
  authDomain: "skiapps-7bbd6.firebaseapp.com",
  projectId: "skiapps-7bbd6",
  storageBucket: "skiapps-7bbd6.appspot.com",
  messagingSenderId: "330906452849",
  appId: "1:330906452849:web:81845c4e31708cc867acd0",
  measurementId: "G-QS8F2FKTYF",
  databaseURL: "https://skiapps-7bbd6-default-rtdb.firebaseio.com",
}

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
export const auth = firebase.auth()
