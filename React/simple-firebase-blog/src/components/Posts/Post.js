import React, { useEffect, useState, useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Post.module.css";
import PostContainer from "../Containers/PostContainer";
import PostBlock from "../Containers/PostBlock";
import {
	getDocs,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";

function Post() {
	const [postLists, setPostList] = useState([]);
	const { isAuth } = useContext(AuthContext);
	const [reactChange, setReactChange] = useState(false);
	const [isPostLoading, setIsPostLoading] = useState(false);

	const deletePost = async (id) => {
		setIsPostLoading(true);
		const postDoc = doc(db, "posts", id);
		await deleteDoc(postDoc);
		setIsPostLoading(false);
	};

	const updatePost = async (post, key) => {
		setReactChange(true);
		let newFields = {};
		const id = post.id;
		const postDoc = doc(db, "posts", id);
		const reactionData = post.postReaction[key];
		let hasCurrentUserPosted;

		const isCurrentUserFound = post.reactionUsers.find(
			(elem) => elem.uid === auth.currentUser.uid
		);

		if (isCurrentUserFound) {
			setReactChange(true);
			hasCurrentUserPosted = isCurrentUserFound.isReactionPosted;

			if (hasCurrentUserPosted && isCurrentUserFound.type[key]) {
				const newReactionUsers = post.reactionUsers.map((user) => {
					if (user.uid === isCurrentUserFound.uid) {
						user = {
							uid: isCurrentUserFound.uid,
							isReactionPosted: false,
							type: { ...user.type, [key]: false },
						};
					}
					return user;
				});

				newFields = {
					reactionUsers: newReactionUsers,
					postReaction: { ...post.postReaction, [key]: reactionData - 1 },
				};
			} else {
				setReactChange(true);
				const newReactionUsers = post.reactionUsers.map((user) => {
					if (user.uid === isCurrentUserFound.uid) {
						user = {
							uid: isCurrentUserFound.uid,
							isReactionPosted: true,
							type: { ...user.type, [key]: true },
						};
					}
					return user;
				});

				newFields = {
					reactionUsers: newReactionUsers,
					postReaction: { ...post.postReaction, [key]: reactionData + 1 },
				};
			}
		} else {
			setReactChange(true);
			let newReactionUsers = post.reactionUsers;
			newReactionUsers = [
				...newReactionUsers,
				{
					uid: auth.currentUser.uid,
					isReactionPosted: true,
					type: { [key]: true },
				},
			];
			newFields = {
				reactionUsers: newReactionUsers,
				postReaction: { ...post.postReaction, [key]: reactionData + 1 },
			};
		}
		await updateDoc(postDoc, newFields);
	};

	const getPost = async () => {
		const data = await getDocs(collection(db, "posts"));
		setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		setIsPostLoading(false);
	};

	useEffect(() => {
		if (reactChange === true) setReactChange(false);
		getPost();
	}, [reactChange]);

	useEffect(() => {
		setIsPostLoading(true);
		getPost();
	}, []);

	return (
		<PostContainer>
			{!isPostLoading ? (
				postLists.map((post) => {
					return (
						<PostBlock key={post.id}>
							<h1 className={styles["post-title"]}>{post.title}</h1>
							<p className={styles["post-body"]}>{post.postContent}</p>
							<h4 className={styles["post-author"]}>
								@{post.author.name}
							</h4>
							{isAuth ? (
								<div className={styles.react}>
									<div>
										<span
											title="Love"
											onClick={() => {
												updatePost(post, "love");
											}}
										>
											<i className="fa-solid fa-heart"></i>
											<p>{post.postReaction.love}</p>
										</span>
										<span
											title="Like"
											onClick={() => {
												updatePost(post, "like");
											}}
										>
											<i className="fa-solid fa-thumbs-up"></i>
											<p>{post.postReaction.like}</p>
										</span>
										<span
											title="Flushed"
											onClick={() => {
												updatePost(post, "flush");
											}}
										>
											<i className="fa-solid fa-face-flushed"></i>
											<p>{post.postReaction.flush}</p>
										</span>
										<span
											title="Surprise"
											onClick={() => {
												updatePost(post, "surprise");
											}}
										>
											<i className="fa-solid fa-face-surprise"></i>
											<p>{post.postReaction.surprise}</p>
										</span>
										<span
											title="Hehe"
											onClick={() => {
												updatePost(post, "hehe");
											}}
										>
											<i className="fa-solid fa-face-grin-stars"></i>
											<p>{post.postReaction.hehe}</p>
										</span>
										<span
											title="ROFL"
											onClick={() => {
												updatePost(post, "rofl");
											}}
										>
											<i className="fa-solid fa-face-grin-squint-tears"></i>
											<p>{post.postReaction.rofl}</p>
										</span>
										<span
											title="Cry"
											onClick={() => {
												updatePost(post, "cry");
											}}
										>
											<i className="fa-solid fa-face-sad-cry"></i>
											<p>{post.postReaction.cry}</p>
										</span>
										<span
											title="Ghost"
											onClick={() => {
												updatePost(post, "ghost");
											}}
										>
											<i className="fa-solid fa-ghost"></i>
											<p>{post.postReaction.ghost}</p>
										</span>
									</div>
									{isAuth && post.author.id === auth.currentUser.uid && (
										<span
											title="Delete Post"
											onClick={() => deletePost(post.id)}
										>
											<i className="fa-solid fa-trash"></i>
										</span>
									)}
								</div>
							) : (
								""
							)}
						</PostBlock>
					);
				})
			) : (
				<h1 style={{ textAlign: "center" }}>Loading Post....</h1>
			)}
			{postLists.length === 0 && !isPostLoading && (
				<h1 style={{ textAlign: "center" }}>No Post FOund</h1>
			)}
		</PostContainer>
	);
}

export default Post;
