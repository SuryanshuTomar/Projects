import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostsExcerpt from "./PostsExcerpt";
import { selectPostIds } from "./postsSlice";
import { useGetPostsQuery } from "./postsSlice";

const PostsList = () => {
	const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

	const orderedPostIds = useSelector(selectPostIds);

	// const [postAscending, setPostAscending] = useState(true);
	// Post in ordered manner
	// slice will return a new shallowcopy of the posts
	// sort will sort the post according to the date posts are created
	// localeCompare will return -1 or +1 accorrding to the date comparison
	// const orderedPosts = !postAscending
	// 	? posts.slice().sort((a, b) => b.date.localeCompare(a.date))
	// 	: posts;
	// const orderedPosts = !postAscending
	// 	? posts.slice().sort((a, b) => b.title.localeCompare(a.title))
	// 	: posts.slice().sort((a, b) => a.title.localeCompare(b.title));

	let content;
	if (isLoading) {
		content = <p>"Loading Posts...</p>;
	} else if (isSuccess) {
		content = orderedPostIds.map((postId) => (
			<PostsExcerpt key={postId} postId={postId} />
		));
	} else if (isError) {
		content = <p>{error}</p>;
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
