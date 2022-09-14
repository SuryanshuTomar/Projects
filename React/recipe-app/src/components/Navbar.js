import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<div className={styles.navbar}>
			<nav>
				<NavLink className={styles.brand} to="/">
					<h1>Recipify</h1>
				</NavLink>
				<NavLink to="create">Create Recipe</NavLink>
			</nav>
		</div>
	);
}

export default Navbar;
