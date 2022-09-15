// import { useState } from "react";
import styles from "./Home.module.css";
import { useFetch } from "../../hooks/useFetch";

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
			{recipes?.map((recipe) => (
				<h2 key={recipe.id}>{recipe.title}</h2>
			))}
		</div>
	);
}

export default Home;
