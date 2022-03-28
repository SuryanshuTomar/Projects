import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
	.initializeApp({
		apiKey: "AIzaSyCYOKC1YnBxrBaczfpRHFzf5UnqOBQHRns",
		authDomain: "mess-24468.firebaseapp.com",
		projectId: "mess-24468",
		storageBucket: "mess-24468.appspot.com",
		messagingSenderId: "697468359666",
		appId: "1:697468359666:web:42e4af4c30ed0b2eabd16b",
	})
	.auth();
