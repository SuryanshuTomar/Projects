import React from "react";

function NewPost(props) {
	const { postTitle, setPostTitle, postBody, setPostBody, handleSubmit } =
		props;

	return (
		<main className="NewPost">
			<h2>New Post</h2>
			<form onSubmit={handleSubmit} className="newPostForm">
				<label htmlFor="postTitle">Title : </label>
				<input
					type="text"
					id="postTitle"
					value={postTitle}
					onChange={(e) => setPostTitle(e.target.value)}
					required
				/>
				<label htmlFor="postBody">Post : </label>
				<textarea
					id="postBody"
					value={postBody}
					onChange={(e) => setPostBody(e.target.value)}
					required
				/>
				<button>Submit</button>
			</form>
		</main>
	);
}

export default NewPost;
