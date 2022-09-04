import React, { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase-config";

function Navbar() {
	const { isAuth, signUserOut } = useContext(AuthContext);
	const currentUser = auth?.currentUser;
	localStorage.setItem("username", JSON.stringify(currentUser));
	return (
		<>
			<div className={styles["nav-container"]}>
				<div className={styles["navbar"]}>
					{currentUser ? (
						<h3>
							{JSON.parse(localStorage.getItem("username")).displayName}
						</h3>
					) : (
						""
					)}
					<NavLink to="/home">
						<h3 className={styles["nav-link"]}>Home</h3>
					</NavLink>
					{isAuth && (
						<NavLink to="/create-post">
							<h3 className={styles["nav-link"]}>CreatePost</h3>
						</NavLink>
					)}
					{isAuth ? (
						<Button onClick={signUserOut}>Sign Out</Button>
					) : (
						<NavLink to="/login">
							<Button>Sign In</Button>
						</NavLink>
					)}
				</div>
			</div>
		</>
	);
}

export default Navbar;
