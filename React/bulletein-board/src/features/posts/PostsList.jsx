import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostsExcerpt from "./PostsExcerpt";
import {
	selectAllPosts,
	getPostsStatus,
	getPostsError,
	fetchPosts,
} from "./postsSlice";

const PostsList = () => {
	const posts = useSelector(selectAllPosts);
	const postsStatus = useSelector(getPostsStatus);
	const postsError = useSelector(getPostsError);
	const dispatch = useDispatch();

	const [postAscending, setPostAscending] = useState(true);

	// fetchPosts dispatch to fetch users asynchronously
	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [postsStatus, dispatch]);

	// Post in ordered manner
	// slice will return a new shallowcopy of the posts
	// sort will sort the post according to the date posts are created
	// localeCompare will return -1 or +1 accorrding to the date comparison
	// const orderedPosts = !postAscending
	// 	? posts.slice().sort((a, b) => b.date.localeCompare(a.date))
	// 	: posts;

	let content;
	if (postsStatus === "loading") {
		content = <p>"Loading Posts...</p>;
	} else if (postsStatus === "succeeded") {
		const orderedPosts = !postAscending
			? posts.slice().sort((a, b) => a.title.localeCompare(b.title))
			: posts.slice().sort((a, b) => b.title.localeCompare(a.title));
		content = orderedPosts.map((post) => (
			<PostsExcerpt key={post.id * Math.random()} post={post} />
		));
	} else if (postsStatus === "failed") {
		content = <p>{postsError}</p>;
	}

	return (
		<section>
			<h2>Posts</h2>
			<div style={{ padding: "20px 0px" }}>
				<span>Order : </span>
				<button
					className="material-symbols-outlined"
					onClick={() => setPostAscending(false)}
				>
					arrow_upward
				</button>
				<button
					className="material-symbols-outlined"
					onClick={() => setPostAscending(true)}
				>
					arrow_downward
				</button>
			</div>{" "}
			{content}
		</section>
	);
};

export default PostsList;
