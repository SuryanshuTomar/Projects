import React from "react";
import Button from "../Button/Button";
import PostBlock from "../Containers/PostBlock";
import PostContainer from "../Containers/PostContainer";
import styles from "./PostForm.module.css";

function PostForm() {
	return (
		<form>
			<PostContainer>
				<PostBlock>
					<h1 className={styles["form-heading"]}>Create A Post</h1>
					<div className={styles["form-title"]}>
						<label htmlFor="form-title">Title : </label>
						<input type="text" id="form-body" />
					</div>{" "}
					<div className={styles["form-body"]}>
						<label htmlFor="form-body">Post : </label>
						<textarea type="text" id="form-body" />
					</div>
					<div className={styles["submit-btn"]}>
						<Button
							style={{ backgroundColor: "sandyBrown", color: "black" }}
						>
							Submit Post
						</Button>
					</div>
				</PostBlock>
			</PostContainer>
		</form>
	);
}

export default PostForm;
