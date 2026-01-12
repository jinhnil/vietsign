// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMila6oZM374mK8XiRmD6vbYufl0vaqa4",
  authDomain: "vietsignschool.firebaseapp.com",
  projectId: "vietsignschool",
  storageBucket: "vietsignschool.firebasestorage.app",
  messagingSenderId: "92860043594",
  appId: "1:92860043594:web:ae18b595af1cdeb849b1b3",
  measurementId: "G-K0SPKDZ18J",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
let analytics;

// Initialize Analytics conditionally (it only works in browser environments)
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics };
