import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";

function App() {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [postTitle, setPostTitle] = useState("");
	const [postBody, setPostBody] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const filteredResults = posts.filter(
			(post) =>
				post.body.toLowerCase().includes(search.toLowerCase()) ||
				post.title.toLowerCase().includes(search.toLowerCase())
		);

		setSearchResults(filteredResults.reverse());
	}, [posts, search]);

	const handleDelete = (id) => {
		const postList = posts.filter((post) => post.id !== id);
		setPosts(postList);
		navigate("/");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
		const datetime = format(new Date(), "MMMM dd, yyyy pp");
		const newPost = { id, title: postTitle, datetime, body: postBody };
		setPosts([...posts, newPost]);
		setPostTitle("");
		setPostBody("");
		navigate("/");
	};

	return (
		<div className="App">
			<Header title="React Js Blog" />
			<Nav search={search} setSearch={setSearch} />
			<Routes>
				<Route path="" element={<Home posts={searchResults} />} />
				<Route
					path="post"
					element={
						<NewPost
							handleSubmit={handleSubmit}
							postTitle={postTitle}
							setPostTitle={setPostTitle}
							postBody={postBody}
							setPostBody={setPostBody}
						/>
					}
				/>
				<Route
					path="post/:id"
					element={<PostPage posts={posts} handleDelete={handleDelete} />}
				/>
				<Route path="about" element={<About />} />
				<Route path="*" element={<Missing />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
