// react
import { useState, useEffect } from "react";
// import { useFetch } from "../../hooks/useFetch";

// styles
import styles from "./Home.module.css";

// components
import RecipeList from "../../components/RecipeList";

// firebase
import { collection, onSnapshot } from "firebase/firestore";
import { projectFirestore } from "../../firebase/config";

function Home() {
	const [recipes, setRecipes] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(false);

	// For JSON server
	// const {
	// 	data: recipes,
	// 	isPending,
	// 	error,
	// } = useFetch("http://localhost:3000/recipes");

	useEffect(() => {
		// -> Collection Ref
		const recipesColRef = collection(projectFirestore, "recipes");

		setIsPending(true);
		const unsubDocsRef = onSnapshot(
			recipesColRef,
			(snapshot) => {
				if (snapshot.empty) {
					setError("No recipes to load !");
				} else {
					setError("");
					let result = [];
					snapshot.docs.forEach((doc) => {
						result.push({ ...doc.data(), id: doc.id });
					});
					setRecipes(result);
				}
				setIsPending(false);
			},
			(error) => {
				setError(error.message);
				setIsPending(false);
			}
		);

		// useEffect Clean up function
		// Unsubscribing to the "recipes" collection ref subscription from onSnapShot
		return () => unsubDocsRef();
	}, []);

	return (
		<div className={styles.home}>
			{error && <p className="error">{error}</p>}
			{isPending && <p className="loading">Loading Recipes....</p>}
			{recipes && <RecipeList recipes={recipes} />}
		</div>
	);
}

export default Home;
