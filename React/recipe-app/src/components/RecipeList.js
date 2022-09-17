// react
import React from "react";

// react-router
import { Link } from "react-router-dom";

//style
import styles from "./RecipeList.module.css";

function RecipeList({ recipes }) {
	if (recipes.length === 0) {
		return <div className="error">No Recipes found....</div>;
	}

	return (
		<div className={styles["recipe-list"]}>
			{recipes.map((recipe) => (
				<div key={recipe.id} className={styles.card}>
					<h3>{recipe.title}</h3>
					<p>{recipe.cookingTime} to make</p>
					<div>{recipe.method.substring(0, 100)}.....</div>
					<Link to={`/recipes/${recipe.id}`}>Cook This</Link>
				</div>
			))}
		</div>
	);
}

export default RecipeList;
