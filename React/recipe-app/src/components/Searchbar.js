// react
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// styles
import styles from "./Searchbar.module.css";

function Searchbar() {
	const [term, setTerm] = useState("");
	const navigate = useNavigate();

	const onSubmitHandler = (event) => {
		event.preventDefault();
		navigate(`/search?query=${term}`);
	};

	return (
		<div className={styles.searchbar}>
			<form onSubmit={onSubmitHandler}>
				<label htmlFor="search">Search: </label>
				<input
					type="text"
					id="search"
					value={term}
					onChange={(e) => setTerm(e.target.value)}
					required
				/>
			</form>
		</div>
	);
}

export default Searchbar;
