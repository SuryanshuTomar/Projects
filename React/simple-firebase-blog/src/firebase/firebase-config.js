import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Thots's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAwT5xWYaCsaAnZhwzbsyeivzKa1OLfXOw",
	authDomain: "react-blog-4a200.firebaseapp.com",
	projectId: "react-blog-4a200",
	storageBucket: "react-blog-4a200.appspot.com",
	messagingSenderId: "854979165325",
	appId: "1:854979165325:web:69b24bf29db2290e8136c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database Instance
export const db = getFirestore(app);

// Auth Instance
export const auth = getAuth(app);

// Google Auth Provieer
export const provider = new GoogleAuthProvider();
