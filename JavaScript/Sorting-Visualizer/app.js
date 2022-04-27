import bubbleSort from "./Algorithms/bubbleSort.js";import selectionSort from "./Algorithms/selectionSort.js";
const generateArrayElem = document.getElementById("generate-array");const arraySizeElem = document.getElementById("array-size");const sortSpeedElem = document.getElementById("sort-speed");const algorithmElem = document.querySelector("#algorithm-dropdown");const algorithmDropdownElem = document.querySelector(".dropdown-menu");const sortElem = document.getElementById("sort");const arrayContainer = document.getElementById("array-container");
let dataSet = "";let arraySize = arraySizeElem.value;let arrayMax = arraySizeElem.max;let sortSpeed = 25;let arrayBlockWidth = "1.8rem";
let generatedArray;
const generateNewArray = (event) => { // const randomNumber = generateRandomNumber(arrayMax); generatedArray = []; arrayContainer.innerHTML = ""; arrayContainer.style.width = `${Number(arraySize) * 1.32}rem`;
 for (let i = 0; i < arraySize; i++) {  let arrayValue = generateRandomNumber(arrayMax) + 10;  generatedArray.push(arrayValue);
  // Creating element div   let array_ele = document.createElement("div");  array_ele.classList.add("col");
  // Adding class 'block' to div   array_ele.classList.add("block");
  // Adding style to div   array_ele.style.height = `${arrayValue * 5}px`;  array_ele.style.transform = `translate(${i * 20}px)`;  // array_ele.style.width =
  // Creating label element for displaying   // size of particular block   let array_ele_label = document.createElement("label");  array_ele_label.classList.add("block_id");  array_ele_label.innerText = arrayValue;
  // Appending created elements to index.html   array_ele.appendChild(array_ele_label);  arrayContainer.appendChild(array_ele); }
 // console.log("New Array Generated", generatedArray);};
const getArraySize = (event) => { console.log("Array Size : ", event.target.value); arraySize = event.target.value;};
const getSortSpeed = (event) => { console.log("Speed : ", event.target.value); sortSpeed = event.target.value;};
const sortingSpeed = () => { return sortSpeed;};
const getAlgorithm = (event) => { // console.log(event.target.dataset.algoName); if (event.target.dataset.algoName !== undefined) {  dataSet = event.target.dataset.algoName;  algorithmElem.textContent = event.target.textContent; }};
const startSorting = (event) => { console.log("DataSet : ", dataSet, "Array size: ", arraySize); if (dataSet === "" || dataSet === null || dataSet === undefined) {  console.log("No Algorithms Selected"); } else if (dataSet === "bubbleSort") {  let blocks = document.querySelectorAll(".block");  bubbleSort(blocks); } else if (dataSet === "selectionSort") {  selectionSort(generatedArray); } else {  console.log("Select any algorithm again !!!"); }};
const generateRandomNumber = (maxValue) => { return Math.floor(Math.random() * maxValue);};
document.addEventListener("DOMContentLoaded", () => { generateNewArray();});
generateArrayElem.addEventListener("click", generateNewArray);
arraySizeElem.addEventListener("click", getArraySize);
sortSpeedElem.addEventListener("click", getSortSpeed);
algorithmDropdownElem.addEventListener("click", getAlgorithm);
sortElem.addEventListener("click", startSorting);

export { arrayContainer, sortingSpeed };

