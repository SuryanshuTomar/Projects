import { sortingSpeed, generateArrayFromData } from "../app.js";

async function selectionSort(array) {
	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	let timer = 3000 - sortingSpeed() * 580;
	let size = array.length;
	for (let i = 0; i < size; i++) {
		let blocks = document.querySelectorAll(".element");
		for (let j = size - i; j < size; j++) {
			blocks[j].style.backgroundColor = "#028c6a";
		}

		// find the max item in the remaining array and swap with its correct index
		let maxIndex = 0;
		let currMax = -Infinity;
		for (let j = 0; j < size - i; j++) {
			// To change background-color of the
			// blocks to be compared
			blocks[j].style.backgroundColor = "yellowgreen";
			timer = 3000 - sortingSpeed() * 580;
			await wait(timer / 3);
			blocks[j].style.backgroundColor = "#e07a5f";

			if (array[j] > currMax) {
				currMax = array[j];
				maxIndex = j;
			}
		}

		// Waiting Timer
		timer = 3000 - sortingSpeed() * 580;
		await wait(timer / 0.75);
		blocks[size - i - 1].style.backgroundColor = "yellow";
		blocks[maxIndex].style.backgroundColor = "yellow";
		// Waiting Timer
		timer = 3000 - sortingSpeed() * 580;
		await wait(timer * 2);

		// swap logic using array destructuring
		[array[size - i - 1], array[maxIndex]] = [
			array[maxIndex],
			array[size - i - 1],
		];
		generateArrayFromData(array);
	}
	alert("Sorting Done 🥳");
}

export { selectionSort };
