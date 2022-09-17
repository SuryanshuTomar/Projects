// react
import React from "react";
import { useSearchParams } from "react-router-dom";
import RecipeList from "../../components/RecipeList";
import { useFetch } from "../../hooks/useFetch";

// styles
import styles from "./Search.module.css";

function Search() {
	const [queryString, setQueryString] = useSearchParams();
	const query = queryString.get("query");
	const url = `http://localhost:3000/recipes?q=${query}`;
	const { data: searchRecipes, isPending, error } = useFetch(url);

	return (
		<div>
			<h2 className="page-title">Recipes including "{query}"</h2>
			{error && <p className="error">{error}</p>}
			{isPending && <p className="loading">Loading Recipes....</p>}
			{searchRecipes && <RecipeList recipes={searchRecipes} />}
		</div>
	);
}

export default Search;
