// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDxZSsRPQHv6VXLsXukNxmAsXZHRJNSb8Y",
	authDomain: "recipify-d3725.firebaseapp.com",
	projectId: "recipify-d3725",
	storageBucket: "recipify-d3725.appspot.com",
	messagingSenderId: "373603338419",
	appId: "1:373603338419:web:991ebe176cc1ccf87c88c6",
};

// Initialize Firebase App
initializeApp(firebaseConfig);

// Init Firestore
const projectFirestore = getFirestore();

export { projectFirestore };
