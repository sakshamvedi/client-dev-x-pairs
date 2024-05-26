// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBgKGe0AUDl2sb3ajKoixh_mO3OL1Q9VN8",
    authDomain: "dev-x-pairs.firebaseapp.com",
    projectId: "dev-x-pairs",
    storageBucket: "dev-x-pairs.appspot.com",
    messagingSenderId: "267969511054",
    appId: "1:267969511054:web:e9059a298016b5d39e93df",
    measurementId: "G-MRQR9FQ1R4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

// Initialize Firebase Auth and Google Auth Provider
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };