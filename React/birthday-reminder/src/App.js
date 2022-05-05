import React, { useState } from "react";
import data from "./data";
import List from "./List";
function App() {
	const [birthdayList, setBirthdayList] = useState(data);

	const birthdayListHandler = () => {
		setBirthdayList([]);
	};

	return (
		<main>
			<div className="container">
				<h3>{birthdayList.length} Birthdays Today</h3>
				<List birthdayList={birthdayList} />
				<button onClick={birthdayListHandler}>Clear All</button>
			</div>
		</main>
	);
}

export default App;
