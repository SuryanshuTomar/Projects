import { bubbleSort } from "./SortingAlgorithms/bubbleSort.js";
import { insertionSort } from "./SortingAlgorithms/insertionSort.js";
import { selectionSort } from "./SortingAlgorithms/selectionSort.js";
import { cycleSort } from "./SortingAlgorithms/cycleSort.js";

const generateArrayElem = document.getElementById("generate-array");
const arraySizeElem = document.getElementById("array-size");
const sortSpeedElem = document.getElementById("sort-speed");
const algorithmElem = document.querySelector("#algorithm-dropdown");
const algorithmDropdownElem = document.querySelector(".dropdown-menu");
const sortElem = document.getElementById("sort");
const arrayBlock = document.querySelector(".array-block");

let dataSet = "";
let arraySize = arraySizeElem.value;
let arrayMax = arraySizeElem.max;
let sortSpeed;
let generatedArray;

const generateNewArray = (event) => {
	generatedArray = [];
	arrayBlock.innerHTML = "";
	for (let i = 0; i < arraySize; i++) {
		let arrayValue = generateRandomNumber(arrayMax) + 10;
		generatedArray.push(arrayValue);

		// Creating element div
		let array_ele = document.createElement("span");
		array_ele.classList.add("element");

		// Adding style to div
		array_ele.style.height = `${arrayValue * 5}px`;
		array_ele.textContent = arrayValue;
		arrayBlock.appendChild(array_ele);
	}
};

const generateArrayFromData = (array) => {
	let generatedArray = array;
	arrayBlock.innerHTML = "";
	for (let i = 0; i < arraySize; i++) {
		let arrayValue = generatedArray[i];

		// Creating element div
		let array_ele = document.createElement("span");
		array_ele.classList.add("element");

		// Adding style to div
		array_ele.style.height = `${arrayValue * 5}px`;
		array_ele.textContent = arrayValue;
		arrayBlock.appendChild(array_ele);
	}
};

const getArraySize = (event) => {
	console.log("Array Size : ", event.target.value);
	arraySize = event.target.value;
};
const getSortSpeed = (event) => {
	console.log("Speed : ", event.target.value);
	sortSpeed = event.target.value;
};
const sortingSpeed = () => {
	return sortSpeed;
};
const getAlgorithm = (event) => {
	console.log(event.target.dataset.algoName);
	if (event.target.dataset.algoName !== undefined) {
		dataSet = event.target.dataset.algoName;
		algorithmElem.textContent = event.target.textContent;
	}
};

const startSorting = (event) => {
	console.log("DataSet : ", dataSet, "Array size: ", arraySize);

	let blocks = document.querySelectorAll(".element");
	if (dataSet === "" || dataSet === null || dataSet === undefined) {
		alert("No Algorithms Selected");
	} else {
		if (dataSet === "bubbleSort") {
			bubbleSort(blocks);
		} else if (dataSet === "selectionSort") {
			selectionSort(generatedArray, blocks);
		} else if (dataSet === "insertionSort") {
			insertionSort(generatedArray, blocks);
		} else if (dataSet === "cycleSort") {
			cycleSort(generatedArray);
		} else {
			alert("Select any algorithm again !!!");
		}
	}
};
const generateRandomNumber = (maxValue) => {
	return Math.floor(Math.random() * maxValue);
};
document.addEventListener("DOMContentLoaded", () => {
	dataSet = "";
	arraySize = 20;
	arraySizeElem.value = arraySize;
	arrayMax = arraySizeElem.max;
	sortSpeed = 3;
	sortSpeedElem.value = sortSpeed;
	generateNewArray();
});

generateArrayElem.addEventListener("click", generateNewArray);
arraySizeElem.addEventListener("click", getArraySize);
sortSpeedElem.addEventListener("click", getSortSpeed);
algorithmDropdownElem.addEventListener("click", getAlgorithm);
sortElem.addEventListener("click", startSorting);

export { arrayBlock, sortingSpeed, generateArrayFromData };
