// react
import React from "react";
import { useTheme } from "../hooks/useTheme";

// react-router
import { Link } from "react-router-dom";

//style
import styles from "./RecipeList.module.css";
import deleteIcon from "../assets/delete_FILL0_wght400_GRAD0_opsz48.svg";

// firebase
import { projectFirestore } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

function RecipeList({ recipes }) {
	const { mode } = useTheme();

	if (recipes.length === 0) {
		return <div className="error">No Recipes found....</div>;
	}

	const deleteRecipeHandler = (docId) => {
		const docRef = doc(projectFirestore, "recipes", docId);
		deleteDoc(docRef)
			.then((doc) => {
				console.log(doc.data());
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className={styles["recipe-list"]}>
			{recipes.map((recipe) => (
				<div
					key={recipe.id}
					className={`${styles.card} ${mode === "dark" && styles.dark}`}
				>
					<h3>{recipe.title}</h3>
					<p>{recipe.cookingTime} to make</p>
					<div>{recipe.method.substring(0, 100)}.....</div>
					<Link to={`/recipes/${recipe.id}`}>Cook This</Link>
					<img
						className={styles.delete}
						src={deleteIcon}
						alt="delete-icon"
						onClick={() => deleteRecipeHandler(recipe.id)}
					/>
				</div>
			))}
		</div>
	);
}

export default RecipeList;
