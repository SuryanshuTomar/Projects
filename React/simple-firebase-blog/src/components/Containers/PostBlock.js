import React from "react";
import styles from "./PostBlock.module.css";

function PostBlock(props) {
	return (
		<div className={styles["post"]} {...props}>
			{props.children}
			{console.log("props: ", props)}
		</div>
	);
}

export default PostBlock;
