import React from "react";
import "firebase/app";

import { auth } from "../firebase";
import firebase from "firebase/app";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";

const Login = (props) => {
	return (
		<div id='login-page'>
			<div id='login-card'>
				<h2>Welcome To Mess</h2>
				<div>
					<div
						className='login-button google'
						onClick={() =>
							auth.signInWithRedirect(
								new firebase.auth.GoogleAuthProvider()
							)
						}
					>
						<GoogleOutlined /> Sign In with Google
					</div>
					<br />
					<br />
					<div
						className='login-button facebook'
						onClick={() =>
							auth.signInWithRedirect(
								new firebase.auth.FacebookAuthProvider()
							)
						}
					>
						<FacebookOutlined /> Sign In with Facebook
					</div>
					<br />
					<br />
				</div>
			</div>
		</div>
	);
};
export default Login;
