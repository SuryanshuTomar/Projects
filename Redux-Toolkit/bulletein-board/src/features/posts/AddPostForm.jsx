import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddNewPostMutation } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
	const users = useSelector(selectAllUsers);
	const navigate = useNavigate();

	const [addNewPost, { isLoading }] = useAddNewPostMutation();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");

	const onTitleChanged = (event) => setTitle(event.target.value);
	const onContentChanged = (event) => setContent(event.target.value);
	const onAuthorChanged = (event) => setUserId(event.target.value);

	const canSave = [title, content, userId].every(Boolean) && !isLoading;

	const onSavePostClicked = async () => {
		if (canSave) {
			try {
				await addNewPost({ title, body: content, userId }).unwrap();
				// redux toolkit adds an unwrap() function to the returned promise and then that returns a new promise that either has the action payload or it throws an error if it's the rejected action so that lets us use this try-catch logic here so it will throw an error

				setTitle("");
				setContent("");
				setUserId("");
				navigate("/");
			} catch (error) {
				console.error("Failed to save the Post : ", error);
			}
		}
	};

	const usersOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));

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
