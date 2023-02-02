import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { getPostById } from "./postsSlice";

import React from "react";

const PostsExcerpt = ({ postId }) => {
	const post = useSelector((state) => getPostById(state, postId));
	return (
		<article>
			<h3>{post.title}</h3>
			<p className="excerpt">{post.body.substring(0, 75)}</p>
			<p className="postCredit">
				<Link to={`post/${post.id}`}>View Post</Link>
				<PostAuthor userId={post.userId} />
				<TimeAgo timeStamp={post.date} />
			</p>

			<ReactionButtons post={post} />
		</article>
	);
};

// Memoising the components
// PostsExcerpt = React.memo(PostsExcerpt);
export default React.memo(PostsExcerpt);
