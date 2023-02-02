import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { useGetPostsByUserIdQuery } from "../posts/postsSlice";

const UserPage = () => {
	const { userId } = useParams();
	const user = useSelector((state) => selectUserById(state, parseInt(userId)));

	// const postForUser = useSelector((state) => {
	// 	const allPosts = selectAllPosts(state);
	// 	return allPosts.filter((post) => post.userId === parseInt(userId));
	// });

	// replacing the above code with new code where useSelector will take our
	// memoised selector function.
	// const postForUser = useSelector((state) =>
	// 	selectPostByUser(state, parseInt(userId))
	// );

	const {
		data: postsForUser,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetPostsByUserIdQuery(userId);

	let content;
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		const { ids, entities } = postsForUser;
		content = ids.map((id) => (
			<li key={id}>
				<Link to={`/post/${id}`}>{entities[id].title}</Link>
			</li>
		));
	} else if (isError) {
		content = <p>{error}</p>;
	}

	return (
		<section>
			<h2>{user?.name}</h2>

			<ol>{content}</ol>
		</section>
	);
};

export default UserPage;
