import React from "react";
import styles from "./PostBlock.module.css";

function PostBlock(props) {
	return (
		<div className={styles["post"]} {...props}>
			{props.children}
		</div>
	);
}

export default PostBlock;
