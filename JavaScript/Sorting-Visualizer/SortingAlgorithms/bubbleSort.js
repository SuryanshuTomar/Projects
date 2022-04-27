import swap from "./swap.js";

export default async function bubbleSort(blocks, delay = 50) {
	// BubbleSort Algorithm
	for (let i = 0; i < blocks.length; i += 1) {
		for (let j = 0; j < blocks.length - i - 1; j += 1) {
			// To change background-color of the
			// blocks to be compared
			blocks[j].style.backgroundColor = "#3d405b";
			blocks[j + 1].style.backgroundColor = "palegreen";

			// To wait for .1 sec
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, delay)
			);

			console.log("run");
			let value1 = Number(blocks[j].childNodes[0].innerHTML);
			let value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

			// To compare value of two blocks
			if (value1 > value2) {
				await swap(blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll(".block");
			}

			// Changing the color to the previous one
			blocks[j].style.backgroundColor = "#e07a5f";
			blocks[j + 1].style.backgroundColor = "#e07a5f";
		}

		//changing the color of greatest element
		//found in the above traversal
		blocks[blocks.length - i - 1].style.backgroundColor = "deepskyblue";
	}
}
