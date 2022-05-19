import React from "react";
import styles from "./Navbar.module.css";

function Navbar() {
	return (
		<div className={styles["nav-container"]}>
			<div className={styles["navbar"]}>
				<h3 className={styles["nav-link"]}>Home</h3>
				<h3 className={styles["nav-link"]}>CreatePost</h3>
				<span className={styles["nav-btn"]}>Sign In</span>
				<span className={styles["nav-btn"]}> Sign out </span>
			</div>
		</div>
	);
}

export default Navbar;
