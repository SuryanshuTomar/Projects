import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostsExcerpt from "./PostsExcerpt";
import { selectAllPosts, getPostsStatus, getPostsError } from "./postsSlice";

const PostsList = () => {
	const posts = useSelector(selectAllPosts);
	const postsStatus = useSelector(getPostsStatus);
	const postsError = useSelector(getPostsError);

	const [postAscending, setPostAscending] = useState(true);

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
			? posts.slice().sort((a, b) => b.title.localeCompare(a.title))
			: posts.slice().sort((a, b) => a.title.localeCompare(b.title));
		content = orderedPosts.map((post) => (
			<PostsExcerpt key={post.id * Math.random()} post={post} />
		));
	} else if (postsStatus === "failed") {
		content = <p>{postsError}</p>;
	}

	return (
		<section>
			<div style={{ padding: "20px 0px" }}>
				<span>Order : </span>
				<button
					className="material-symbols-outlined"
					onClick={() => setPostAscending(true)}
				>
					arrow_upward
				</button>
				<button
					className="material-symbols-outlined"
					onClick={() => setPostAscending(false)}
				>
					arrow_downward
				</button>
			</div>{" "}
			{content}
		</section>
	);
};

export default PostsList;
