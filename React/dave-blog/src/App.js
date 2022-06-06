import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";

function App() {
	const [posts, setPosts] = useState([
		{
			id: 1,
			title: "My First Post",
			datetime: "July 01, 2021 11:17:36 AM",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
		},
		{
			id: 2,
			title: "My 2nd Post",
			datetime: "July 01, 2021 11:17:36 AM",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
		},
		{
			id: 3,
			title: "My 3rd Post",
			datetime: "July 01, 2021 11:17:36 AM",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
		},
		{
			id: 4,
			title: "My Fourth Post",
			datetime: "July 01, 2021 11:17:36 AM",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
		},
	]);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const navigate = useNavigate();

	const handleDelete = (id) => {
		const postList = posts.filter((post) => post.id !== id);
		setPosts(postList);
		navigate("/");
	};

	return (
		<div className="App">
			<Header title="React Js Blog" />
			<Nav search={search} setSearch={setSearch} />
			<Routes>
				<Route path="" element={<Home posts={posts} />} />
				<Route path="post" element={<NewPost />} />
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
