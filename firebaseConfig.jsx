import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCTjrVhzpk9GrHDvAbvLRzxgpAu_d72SqM",
  authDomain: "neighbourhood-fc66b.firebaseapp.com",
  projectId: "neighbourhood-fc66b",
  storageBucket: "neighbourhood-fc66b.firebasestorage.app",
  messagingSenderId: "661370168248",
  appId: "1:661370168248:web:0615ee26e8d1facea1654d",
  measurementId: "G-5V95YTW48F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };