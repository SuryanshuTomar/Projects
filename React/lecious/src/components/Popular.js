import React, { useState, useEffect } from "react";

function Popular() {
	const [popular, setPopular] = useState([]);

	const getPopular = async () => {
		const response = await fetch(
			`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9`
		);
		const data = await response.json();
		console.log(data.recipes);
		setPopular(data.recipes);
	};

	useEffect(() => {
		getPopular();
	}, []);

	return (
		<div>
			{popular.map((recipe) => (
				<div key={recipe.id}>
					<p>{recipe.title}</p>
				</div>
			))}
		</div>
	);
}

export default Popular;
