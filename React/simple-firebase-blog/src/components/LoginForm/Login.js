import React, { useContext } from "react";
import { auth, provider } from "../../firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

export const Login = () => {
	const { setIsAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	const signInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log(result);
				localStorage.setItem("isAuth", true);
				setIsAuth(true);
				navigate("/home");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className={styles["login-page"]}>
			<p>Sign In With Google to Continue...</p>
			<button
				className={styles["login-with-google-btn"]}
				onClick={signInWithGoogle}
			>
				Sign in wih Google
			</button>
		</div>
	);
};
