// react
// import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

// styles
import styles from "./Home.module.css";

// components
import RecipeList from "../../components/RecipeList";

function Home() {
	const {
		data: recipes,
		isPending,
		error,
	} = useFetch(" http://localhost:3000/recipes");

	return (
		<div className={styles.home}>
			{error && <p className="error">{error}</p>}
			{isPending && <p className="loading">Loading Recipes....</p>}
			{recipes && <RecipeList recipes={recipes} />}
		</div>
	);
}

export default Home;
