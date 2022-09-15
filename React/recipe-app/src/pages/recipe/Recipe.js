// react
import React from "react";
import { useFetch } from "../../hooks/useFetch";

// styles
import styles from "./Recipe.module.css";

// react router
import { useParams } from "react-router-dom";

function Recipe() {
	const { id } = useParams();
	const url = `http://localhost:3000/recipes/${id}`;
	const { data: recipe, isPending, error } = useFetch(url);

	return (
		<div className={styles.recipe}>
			{error && <p className="error">{error}</p>}
			{isPending && <p className="loading">Loading Recipes....</p>}
			{recipe && (
				<>
					<h2 className="page-title">{recipe.title}</h2>
					<p>Takes {recipe.cookingTime} to cook.</p>
					<ul>
						{recipe.ingredients.map((ing) => (
							<li key={ing}>{ing}</li>
						))}
					</ul>
					<p className={styles["method"]}>{recipe.method}</p>
				</>
			)}
		</div>
	);
}

export default Recipe;
