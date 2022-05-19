import React from "react";
import Post from "./Post";
import styles from "./PostContainer.module.css";

function PostContainer() {
	return (
		<div className={styles["post-container"]}>
			<Post />
		</div>
	);
}

export default PostContainer;
