// react
import React from "react";
import { useTheme } from "../hooks/useTheme";
import Searchbar from "./Searchbar";

// styles
import styles from "./Navbar.module.css";

// React router
import { NavLink } from "react-router-dom";

function Navbar() {
	const { color } = useTheme();

	return (
		<div className={styles.navbar} style={{ background: color }}>
			<nav>
				<NavLink className={styles.brand} to="/">
					<h1>Recipify</h1>
				</NavLink>
				<Searchbar />
				<NavLink to="create">Create Recipe</NavLink>
			</nav>
		</div>
	);
}

export default Navbar;
