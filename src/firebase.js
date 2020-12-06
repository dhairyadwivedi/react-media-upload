import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDL54AwbyXCJIUFdPWE1HRqn8BsKtvAiSY",
  authDomain: "react-media-upload.firebaseapp.com",
  projectId: "react-media-upload",
  storageBucket: "react-media-upload.appspot.com",
  messagingSenderId: "392217409711",
  appId: "1:392217409711:web:8b3e0cd932b878fef2fc5a",
  measurementId: "G-KE9782S0H4",
};

firebase.initializeApp(firebaseConfig);

const storageRef = firebase.storage().ref();
export { storageRef, firebase };
