import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Recipe from "./pages/recipe/Recipe";
import Search from "./pages/search/Search";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="create" element={<Create />} />
				<Route path="recipes/:id" element={<Recipe />} />
				<Route path="search" element={<Search />} />
			</Routes>
		</div>
	);
}

export default App;
