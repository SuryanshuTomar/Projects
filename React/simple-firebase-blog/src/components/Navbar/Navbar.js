import React, { useContext } from "react";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
	const { isAuth, signUserOut } = useContext(AuthContext);
	return (
		<>
			<div className={styles["nav-container"]}>
				<div className={styles["navbar"]}>
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
