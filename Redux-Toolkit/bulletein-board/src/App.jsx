import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./components/Layout";

import { Routes, Route, Navigate } from "react-router-dom";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<PostsList />} />

				<Route path="post">
					<Route index element={<AddPostForm />} />
					<Route path=":postId" element={<SinglePostPage />} />
					<Route path="edit">
						<Route path=":postId" element={<EditPostForm />} />
					</Route>
				</Route>

				<Route path="user">
					<Route index element={<UsersList />} />
					<Route path=":userId" element={<UserPage />} />
				</Route>

				{/* Catch all - replace with 404 component */}
				{/* replace flag will replace the route which we tried to access but 
				it doesn't exist in our application with "/" */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
}

export default App;
