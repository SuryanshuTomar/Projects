import Navbar from "./components/Navbar/Navbar";
import PostForm from "./components/PostForm/PostForm";
import Post from "./components/Posts/Post";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Post />
			<PostForm />
		</div>
	);
}

export default App;
