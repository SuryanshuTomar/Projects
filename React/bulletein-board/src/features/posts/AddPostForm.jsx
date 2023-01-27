import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postsSlice";

const AddPostForm = () => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const onTitleChanged = (event) => setTitle(event.target.value);
	const onContentChanged = (event) => setContent(event.target.value);

	const onSavePostClicked = () => {
		if (title && content) {
			dispatch(postAdded(title, content));
			setTitle("");
			setContent("");
		}
	};

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
				{/* <label htmlFor="postAuthor">Author:</label>
				<select id="postAuthor" value={userId} onChange={onAuthorChanged}>
					<option value=""></option>
					{usersOptions}
				</select> */}
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
					// disabled={!canSave}
				>
					Save Post
				</button>
			</form>
		</section>
	);
};

export default AddPostForm;
