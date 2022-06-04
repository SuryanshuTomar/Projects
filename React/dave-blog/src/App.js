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
	return (
		<div className="App">
			<Header title="React Js Blog" />
			<Nav />
			<Routes>
				<Route path="" element={<Home />} />
				<Route path="post" element={<NewPost />} />
				<Route path="post/:id" element={<PostPage />} />
				<Route path="about" element={<About />} />
				<Route path="*" element={<Missing />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
