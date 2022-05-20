import React, { useContext, useEffect } from "react";
import useInput from "../../hooks/UseInput";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { db, auth } from "../../firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";

import PostBlock from "../Containers/PostBlock";
import PostContainer from "../Containers/PostContainer";
import styles from "./PostForm.module.css";
import Button from "../Button/Button";

function PostForm() {
	const { isAuth } = useContext(AuthContext);
	const [title, bindTitle, resetTitle] = useInput("");
	const [postContent, bindPostContent, resetPostContent] = useInput("");
	const navigate = useNavigate();

	const postsCollectionRef = collection(db, "posts");

	const createPost = async () => {
		await addDoc(postsCollectionRef, {
			title,
			postContent,
			postReaction: {
				love: 0,
				like: 0,
				flush: 0,
				surprise: 0,
				hehe: 0,
				rofl: 0,
				cry: 0,
				ghost: 0,
			},
			author: {
				name: auth.currentUser.displayName,
				id: auth.currentUser.uid,
			},
		});
	};

	const submitHandler = () => {
		if (!title.trim()) {
			alert("Title cannot be Empty!");
			return;
		}
		if (!postContent.trim()) {
			alert("Post Content cannot be Empty!");
			return;
		}
		resetTitle("");
		resetPostContent("");
		createPost();
		navigate("/home");
	};

	useEffect(() => {
		if (!isAuth) {
			navigate("/home");
		}
	}, []);

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
