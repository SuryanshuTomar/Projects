import React, { useEffect, useState, useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Post.module.css";
import PostContainer from "../Containers/PostContainer";
import PostBlock from "../Containers/PostBlock";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";

function Post() {
	const [postLists, setPostList] = useState([]);
	const { isAuth } = useContext(AuthContext);

	const [isPostLoading, setIsPostLoading] = useState(false);

	const deletePost = async (id) => {
		setIsPostLoading(true);
		const postDoc = doc(db, "posts", id);
		await deleteDoc(postDoc);
		setIsPostLoading(false);
	};

	useEffect(() => {
		setIsPostLoading(true);
		const getPost = async () => {
			const data = await getDocs(collection(db, "posts"));
			setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			setIsPostLoading(false);
		};

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
							<div className={styles.react}>
								<div>
									<span title="Love">
										<i className="fa-solid fa-heart"></i>
										<p>{post.postReaction.love}</p>
									</span>
									<span title="Like">
										<i className="fa-solid fa-thumbs-up"></i>
										<p>{post.postReaction.like}</p>
									</span>
									<span title="Flushed">
										<i className="fa-solid fa-face-flushed"></i>
										<p>{post.postReaction.flush}</p>
									</span>
									<span title="Surprise">
										<i className="fa-solid fa-face-surprise"></i>
										<p>{post.postReaction.surprise}</p>
									</span>
									<span title="Hehe">
										<i className="fa-solid fa-face-grin-stars"></i>
										<p>{post.postReaction.hehe}</p>
									</span>
									<span title="ROFL">
										<i className="fa-solid fa-face-grin-squint-tears"></i>
										<p>{post.postReaction.rofl}</p>
									</span>
									<span title="Cry">
										<i className="fa-solid fa-face-sad-cry"></i>
										<p>{post.postReaction.cry}</p>
									</span>
									<span title="Ghost">
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
						</PostBlock>
					);
				})
			) : (
				<h1 style={{ textAlign: "center" }}>Loading Post....</h1>
			)}
		</PostContainer>
	);
}

export default Post;
