import { useState, useRef } from "react";
import { useFetch } from "../hooks/UseFetch";

// styles
import "./SearchBar.css";

function SearchBar() {
	const { data, error, isPending } = useFetch(
		"https://jsonplaceholder.typicode.com/posts"
	);

	const [searchText, setSearchText] = useState("");
	const inputRef = useRef(null);

	const onSearchChangeHandler = (event) => {
		setSearchText(event.target.value);
	};

	const closeSearchHandler = () => {
		setSearchText("");
	};

	return (
		<>
			<h1>Autocomplete Search Bar</h1>
			<div className="search-container">
				<div className="search-input">
					<input
						type="text"
						ref={inputRef}
						value={searchText}
						placeholder="Search Posts....."
						onChange={onSearchChangeHandler}
					/>
					{searchText !== "" && (
						<button onClick={closeSearchHandler}>X</button>
					)}
				</div>
				<div
					className={searchText && `search-result`}
					// styles={searchText && { border: "1px solid black" }}
				>
					{isPending && <h3>Loading.....</h3>}
					{error && <h3>{error}</h3>}
					{!isPending &&
						data
							?.filter(
								(post) =>
									post.title.includes(searchText) && searchText !== ""
							)
							.slice(0, 10)
							.map((post) => (
								<>
									<p
										key={post.id}
										onClick={() => setSearchText(post.title)}
									>
										{post.title}
									</p>
									<hr />
								</>
							))}
				</div>
			</div>
		</>
	);
}

export default SearchBar;
