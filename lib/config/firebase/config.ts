// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFFsgpd2QcYdQMpM0OxIJRK8JGWUJJQlg",
  authDomain: "tesis-jack.firebaseapp.com",
  projectId: "tesis-jack",
  storageBucket: "tesis-jack.appspot.com",
  messagingSenderId: "254842960848",
  appId: "1:254842960848:web:953699f5ca4597066897d5",
  measurementId: "G-Z3NZJ66D72",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default storage
