import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
	const users = useSelector(selectAllUsers);
	const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");

	const onTitleChanged = (event) => setTitle(event.target.value);
	const onContentChanged = (event) => setContent(event.target.value);
	const onAuthorChanged = (event) => setUserId(event.target.value);

	const onSavePostClicked = () => {
		if (title && content) {
			dispatch(postAdded(title, content, userId));
			setTitle("");
			setContent("");
			setUserId("");
		}
	};

	const usersOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));

	const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

	return (
		<section>
			<h2>Add a New Post</h2> <br />
			<form>
				<label htmlFor="postTitle">Post Title:</label>
				<input
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={onTitleChanged}
				/>
				<label htmlFor="postAuthor">Author:</label>
				<select id="postAuthor" value={userId} onChange={onAuthorChanged}>
					<option value=""></option>
					{usersOptions}
				</select>
				<label htmlFor="postContent">Content:</label>
				<textarea
					id="postContent"
					name="postContent"
					value={content}
					onChange={onContentChanged}
				/>
				<button
					type="button"
					onClick={onSavePostClicked}
					disabled={!canSave}
				>
					Save Post
				</button>
			</form>
		</section>
	);
};

export default AddPostForm;