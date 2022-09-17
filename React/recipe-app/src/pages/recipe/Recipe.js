// react
import { useState, useEffect } from "react";
// import { useFetch } from "../../hooks/useFetch";

// styles
import styles from "./Recipe.module.css";
import { useTheme } from "../../hooks/useTheme";

// react router
import { useParams } from "react-router-dom";

// firebase
import { doc, getDoc } from "firebase/firestore";
import { projectFirestore } from "../../firebase/config";

function Recipe() {
	const { mode } = useTheme();
	const { id } = useParams();

	const [recipe, setRecipe] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setIsPending(true);
		const docRef = doc(projectFirestore, "recipes", id);
		getDoc(docRef).then((doc) => {
			if (doc.exists()) {
				setError("");
				setIsPending(false);
				setRecipe(doc.data());
			} else {
				setError("Could not find the Recipe !");
				setIsPending(false);
			}
		});
	}, [id]);

	return (
		<div className={`${styles.recipe} ${mode === "dark" && styles.dark}`}>
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
