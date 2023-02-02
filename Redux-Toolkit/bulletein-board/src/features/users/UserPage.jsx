import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAllPosts, selectPostByUser } from "../posts/postsSlice";
import { selectUserById } from "./usersSlice";

const UserPage = () => {
	const { userId } = useParams();
	const user = useSelector((state) => selectUserById(state, parseInt(userId)));

	// const postForUser = useSelector((state) => {
	// 	const allPosts = selectAllPosts(state);
	// 	return allPosts.filter((post) => post.userId === parseInt(userId));
	// });

	// replacing the above code with new code where useSelector will take our
	// memoised selector function.
	const postForUser = useSelector((state) =>
		selectPostByUser(state, parseInt(userId))
	);

	const postTitles = postForUser.map((post) => {
		return (
			<li key={post.id}>
				<Link to={`/post/${post.id}`}>{post.title}</Link>
			</li>
		);
	});

	return (
		<section>
			<h2>{user?.name}</h2>

			<ol>{postTitles}</ol>
		</section>
	);
};

export default UserPage;
