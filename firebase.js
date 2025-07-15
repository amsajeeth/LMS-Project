// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgaN5GSGueUTbkOVIX5IXJetNiH_uCtW4",
  authDomain: "sf-cw-87713.firebaseapp.com",
  projectId: "sf-cw-87713",
  storageBucket: "sf-cw-87713.appspot.com",
  messagingSenderId: "850750094356",
  appId: "1:850750094356:web:f80833c2f420d2b542bb01",
  measurementId: "G-24Y2PQET4P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

// export const storage = getStorage(app);
export const db = getFirestore(app);
