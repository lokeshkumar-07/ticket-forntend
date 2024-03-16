// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {apiKey, messagingSenderId, appId} from '../config.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "mern-docapp.firebaseapp.com",
  projectId: "mern-docapp",
  storageBucket: "mern-docapp.appspot.com",
  messagingSenderId: messagingSenderId,
  appId: appId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);