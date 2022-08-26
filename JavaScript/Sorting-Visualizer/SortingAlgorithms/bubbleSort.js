import { swap } from "./swap.js";
import { sortingSpeed } from "../app.js";

// BubbleSort Algorithm
async function bubbleSort(blocks) {
	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	for (let i = 0; i < blocks.length; i += 1) {
		for (let j = 0; j < blocks.length - i - 1; j += 1) {
			// To change background-color of the
			// blocks to be compared
			blocks[j].style.backgroundColor = "green";
			blocks[j + 1].style.backgroundColor = "yellowgreen";

			// Waiting Timer
			let timer = 3000 - sortingSpeed() * 580;
			await wait(timer);

			// console.log("run");
			let value1 = Number(blocks[j].textContent);
			let value2 = Number(blocks[j + 1].textContent);

			// To compare value of two blocks
			if (value1 > value2) {
				swap(blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll(".element");
			}

			// Changing the color to the previous one
			blocks[j].style.backgroundColor = "#e07a5f";
			blocks[j + 1].style.backgroundColor = "#e07a5f";
		}

		//changing the color of greatest element
		//found in the above traversal
		blocks[blocks.length - i - 1].style.backgroundColor = "#028c6a";
	}
}

export { bubbleSort };
