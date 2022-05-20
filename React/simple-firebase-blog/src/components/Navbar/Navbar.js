import React from "react";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
	return (
		<>
			<div className={styles["nav-container"]}>
				<div className={styles["navbar"]}>
					<NavLink to="/home">
						<h3 className={styles["nav-link"]}>Home</h3>
					</NavLink>
					<NavLink to="/create-post">
						<h3 className={styles["nav-link"]}>CreatePost</h3>
					</NavLink>
					<NavLink to="/login">
						<Button>Sign In</Button>
					</NavLink>
					<NavLink to="/logout">
						<Button>Sign Out</Button>
					</NavLink>
				</div>
			</div>
		</>
	);
}

export default Navbar;
