// react
import { useState, useRef, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

// style
import styles from "./Create.module.css";

// firebase
import { projectFirestore } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

function Create() {
	const [title, setTitle] = useState("");
	const [method, setMethod] = useState("");
	const [cookingTime, setCookingTime] = useState("");
	const [newIngredient, setNewIngredient] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const ingredientRef = useRef(null);

	// For JSON server
	// const { data, postData } = useFetch("http://localhost:3000/recipes", "POST");

	const data = [];
	const navigate = useNavigate();

	const onSubmitHandler = (event) => {
		event.preventDefault();
		setTitle("");
		setMethod("");
		setCookingTime("");
		setNewIngredient("");
		setIngredients([]);

		const colRef = collection(projectFirestore, "recipes");
		const doc = {
			title,
			ingredients,
			method,
			cookingTime: cookingTime + " minutes",
		};

		addDoc(colRef, doc)
			.then((doc) => {
				data.push(doc);
				navigate("/");
			})
			.catch((error) => console.log(error));
	};

	// For JSON server
	// redirect the use when we get the data response
	// useEffect(() => {
	// 	if (data) {
	// 		console.log(data);
	// 		navigate("/");
	// 	}
	// }, [data, navigate]);

	const addIngredientsHandler = (event) => {
		event.preventDefault();
		const ing = newIngredient.trim();
		if (ing && !ingredients.includes(ing)) {
			setIngredients((prevIngredients) => [...prevIngredients, ing]);
		}
		setNewIngredient("");
		ingredientRef.current.focus();
	};

	return (
		<div className={styles.create}>
			<h2 className="page-title">Add a New Recipe</h2>
			<form onSubmit={onSubmitHandler}>
				<label>
					<span>Recipe title: </span>
				</label>
				<input
					type="text"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
					required
				/>

				<label>
					<span>Recipe ingredients: </span>
					<div className={styles["ingredients"]}>
						<input
							type="text"
							value={newIngredient}
							onChange={(event) => setNewIngredient(event.target.value)}
							ref={ingredientRef}
						/>

						<button className="btn" onClick={addIngredientsHandler}>
							Add
						</button>
					</div>
				</label>
				<p>
					Current ingredients :{" "}
					{ingredients.map((ing) => (
						<em key={ing}>{ing}, </em>
					))}
				</p>

				<label>
					<span>Recipe method: </span>
				</label>
				<textarea
					value={method}
					onChange={(event) => setMethod(event.target.value)}
					required
				/>

				<label>
					<span>Cooking time (minutes): </span>
				</label>
				<input
					type="number"
					value={cookingTime}
					onChange={(event) => setCookingTime(event.target.value)}
					required
				/>

				<button className="btn">Submit</button>
			</form>
		</div>
	);
}

export default Create;
