import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    // your Firebase credentials go here
    apiKey: "AIzaSyC2j22Aaz77wS47IxjQOLt3GvIC2BK6H9g",

    authDomain: "messenger-clone-47ec6.firebaseapp.com",
  
    projectId: "messenger-clone-47ec6",
  
    storageBucket: "messenger-clone-47ec6.appspot.com",
  
    messagingSenderId: "587183914730",
  
    appId: "1:587183914730:web:af287132c94f9454046193"
  
})

const db = firebaseApp.firestore()

export default db