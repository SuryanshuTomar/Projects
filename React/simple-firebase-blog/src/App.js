import Navbar from "./components/Navbar/Navbar";
import PostForm from "./components/PostForm/PostForm";
import Post from "./components/Posts/Post";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound/NotFound";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route index element={<Post />} />
				<Route path="/home" element={<Post />} />
				<Route path="/create-post" element={<PostForm />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
