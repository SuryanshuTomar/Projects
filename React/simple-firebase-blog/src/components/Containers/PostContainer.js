import React from "react";
import styles from "./PostContainer.module.css";

function PostContainer(props) {
	return (
		<>
			<div className={styles["post-container"]} {...props}>
				{props.children}
			</div>
		</>
	);
}

export default PostContainer;
