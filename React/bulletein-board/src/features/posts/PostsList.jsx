import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import React, { useState } from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
	const posts = useSelector(selectAllPosts);

	const [postAscending, setPostAscending] = useState(true);

	// Post in ordered manner
	// slice will return a new shallowcopy of the posts
	// sort will sort the post according to the date posts are created
	// localeCompare will return -1 or +1 accorrding to the date comparison
	const orderedPosts = !postAscending
		? posts.slice().sort((a, b) => b.date.localeCompare(a.date))
		: posts;

	const renderedPosts = orderedPosts.map((post) => (
		<article key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.content.substring(0, 100)}</p>
			<p className="postCredit">
				<PostAuthor userId={post.userId} />
				<TimeAgo timeStamp={post.date} />
			</p>
		</article>
	));
	return (
		<section>
			<h2>Posts</h2>
			<div style={{ padding: "20px 0px" }}>
				<span>Order : </span>
				<button
					class="material-symbols-outlined"
					onClick={() => setPostAscending(true)}
				>
					arrow_upward
				</button>
				<button
					class="material-symbols-outlined"
					onClick={() => setPostAscending(false)}
				>
					arrow_downward
				</button>
			</div>{" "}
			{renderedPosts}
		</section>
	);
};

export default PostsList;
