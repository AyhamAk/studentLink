// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

let firebaseConfig;
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyBnan6TWVLMjoDouH1TsUTrCbTWzf2UPos",
    authDomain: "studentslink-3f557.firebaseapp.com",
    projectId: "studentslink-3f557",
    storageBucket: "studentslink-3f557.appspot.com",
    messagingSenderId: "174002600541",
    appId: "1:174002600541:web:ddb235da61181de2306bb4"
  },
};
export const app=initializeApp(environment.firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


