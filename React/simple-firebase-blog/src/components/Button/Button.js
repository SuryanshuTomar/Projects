import React from "react";
import styles from "./Button.module.css";

function Button(props) {
	return (
		<>
			<span className={styles["nav-btn"]} {...props}>
				{props.children}
			</span>
		</>
	);
}

export default Button;
