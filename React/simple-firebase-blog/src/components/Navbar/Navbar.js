import React from "react";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";

function Navbar() {
	return (
		<div className={styles["nav-container"]}>
			<div className={styles["navbar"]}>
				<h3 className={styles["nav-link"]}>Home</h3>
				<h3 className={styles["nav-link"]}>CreatePost</h3>
				<Button>Sign In</Button>
				<Button>Sign Out</Button>
			</div>
		</div>
	);
}

export default Navbar;
