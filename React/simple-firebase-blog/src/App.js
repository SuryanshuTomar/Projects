import Navbar from "./components/Navbar/Navbar";
import PostForm from "./components/PostForm/PostForm";
import Post from "./components/Posts/Post";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound/NotFound";
import { Login } from "./components/LoginForm/Login";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
	return (
		<div className="App">
			<AuthContextProvider>
				<Navbar />
				<Routes>
					<Route index element={<Post />} />
					<Route path="/home" element={<Post />} />
					<Route path="/create-post" element={<PostForm />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthContextProvider>
		</div>
	);
}

export default App;
