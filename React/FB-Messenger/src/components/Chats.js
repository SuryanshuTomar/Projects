import React from "react";

import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const Chats = (props) => {
	const history = useHistory();
	const { user } = useAuth();

	console.log(user);

	const handleLogout = async () => {
		console.log("Logged Out");
		await auth.signOut();
		history.push("/");
	};

	return (
		<div className="chats-page">
			<div className="nav-bar">
				<div className="logo-tab">Mess</div>
				<div className="logout-tab" onClick={handleLogout}>
					Logout
				</div>
			</div>
			<ChatEngine
				height="calc(100vh - 66px)"
				projectId="39d1a9b0-8601-4c14-82d8-93ee82d60253"
				userName="."
				userSecret="."
			></ChatEngine>
		</div>
	);
};

export default Chats;
