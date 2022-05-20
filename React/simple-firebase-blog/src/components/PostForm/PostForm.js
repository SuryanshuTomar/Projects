import React from "react";
import useInput from "../../hooks/UseInput";

import PostBlock from "../Containers/PostBlock";
import PostContainer from "../Containers/PostContainer";

import styles from "./PostForm.module.css";
import Button from "../Button/Button";

function PostForm() {
	const [title, bindTitle, resetTitle] = useInput("");
	const [postContent, bindPostContent, resetPostContent] = useInput("");

	const submitHandler = () => {
		if (!title.trim()) {
			alert("Title cannot be Empty!");
			return;
		}
		if (!postContent.trim()) {
			alert("Post Content cannot be Empty!");
			return;
		}
		console.log(title);
		console.log(postContent);
		resetTitle("");
		resetPostContent("");
	};

	return (
		<form>
			<PostContainer>
				<PostBlock>
					<h1 className={styles["form-heading"]}>Create A Post</h1>
					<div className={styles["form-title"]}>
						<label htmlFor="form-title">Title : </label>
						<input type="text" id="form-body" {...bindTitle} />
					</div>{" "}
					<div className={styles["form-body"]}>
						<label htmlFor="form-body">Post : </label>
						<textarea type="text" id="form-body" {...bindPostContent} />
					</div>
					<div className={styles["submit-btn"]}>
						<Button
							style={{ backgroundColor: "sandyBrown", color: "black" }}
							onClick={submitHandler}
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
