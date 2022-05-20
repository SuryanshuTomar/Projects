import { useReducer, useState, createContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
	const [isAuth, setIsAuth] = useState(false);
	const navigate = useNavigate();

	const signUserOut = () => {
		signOut(auth);
		setIsAuth(false);
		localStorage.setItem("isAuth", false);
		navigate("/login");
	};

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth, signUserOut }}>
			{props.children}
		</AuthContext.Provider>
	);
};
