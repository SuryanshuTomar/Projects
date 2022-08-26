import { binarySearch } from "./searches/binarySearch.js";
import { linearSearch } from "./searches/linearSearch.js";

const arraySizeElement = document.getElementById("array-size");
const searchSpeedElement = document.getElementById("search-speed");
const searchSelectorElement = document.getElementById("searches");
const arrayElement = document.getElementById("array");
const inputElement = document.getElementById("target-input");
const searchBtn = document.getElementById("target-search");
const footer = document.querySelector(".foot-container");

let arraySize, searchSpeed, searchType;

(function main() {
	arraySizeElement.value = 15;
	searchSpeedElement.value = 3;
	arraySize = arraySizeElement.value;
	searchSpeed = searchSpeedElement.value;
	searchType = searchSelectorElement.value;
	generateArray(arraySize, searchType);
})();

arraySizeElement.addEventListener("change", () => {
	arraySize = arraySizeElement.value;
	console.log(arraySize);

	generateArray(arraySize, searchType);
});

searchSpeedElement.addEventListener("change", () => {
	searchSpeed = searchSpeedElement.value;
	console.log(searchSpeed);
});

searchSelectorElement.addEventListener("change", () => {
	searchType = searchSelectorElement.value;
	if (searchType == "linear") {
		footer.innerHTML = "<h2>Linear Search</h2>";
	} else {
		footer.innerHTML = "<h2>Binary Search</h2>";
	}
	generateArray(arraySize, searchType);
});

searchBtn.addEventListener("click", () => {
	let targetValue = +inputElement.value.trim();
	console.log(targetValue);
	if (inputElement.value.trim() == "" || isNaN(targetValue)) {
		alert("Enter a valid search target ‼");
		return;
	}
	startSearch(targetValue);
});

async function startSearch(targetValue) {
	let result;
	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	if (searchSelectorElement.value == "linear") {
		result = await linearSearch(targetValue);
	} else {
		result = await binarySearch(targetValue);
	}

	await wait(500);
	if (result == -1) {
		alert(`Target ${targetValue} not found in the current array ☹`);
	} else if (result >= 0) {
		alert(`Target ${targetValue} found at index ${result} 😎`);
	}
}

function generateRandomNumber(endNumber = 100) {
	return Math.floor(Math.random() * endNumber);
}

function generateArray(size, searchType) {
	let arr = [];
	arrayElement.innerHTML = "";
	for (let i = 0; i < size; i++) {
		arr[i] = generateRandomNumber();
	}

	if (searchType == "binary") {
		arr.sort((a, b) => a - b);
	}

	for (let i = 0; i < arr.length; i++) {
		const element = document.createElement("span");
		element.setAttribute("id", i);
		element.classList.add("element");
		element.innerHTML = arr[i];
		arrayElement.appendChild(element);
	}
}

export { searchSpeed };
