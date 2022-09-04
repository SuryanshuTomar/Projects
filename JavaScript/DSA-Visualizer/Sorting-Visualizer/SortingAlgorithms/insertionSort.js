import { sortingSpeed, generateArrayFromData } from "../app.js";

async function insertionSort(array) {
	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	let timer = 3000 - sortingSpeed() * 580;
	let size = array.length;
	for (let i = 0; i < size - 1; i++) {
		let blocks = document.querySelectorAll(".element");
		for (let j = 0; j <= i; j++) {
			//changing the color of greatest element
			//found in the above traversal
			blocks[j].style.backgroundColor = "#028c6a";
		}

		// sorting till i part of the array
		for (let j = i + 1; j > 0; j--) {
			if (j > 0) {
				blocks[j].style.backgroundColor = "yellowgreen";
				// Waiting Timer
				timer = 3000 - sortingSpeed() * 580;
				await wait(timer / 0.75);
				blocks[j].style.backgroundColor = "#028c6a";
			}

			// swap if the previous elment in the sorted part of the array is less
			// then the current element
			if (array[j] < array[j - 1]) {
				// Waiting Timer
				timer = 3000 - sortingSpeed() * 580;
				await wait(timer / 2);
				blocks[j].style.backgroundColor = "yellow";
				blocks[j - 1].style.backgroundColor = "yellow";
				// Waiting Timer
				timer = 3000 - sortingSpeed() * 580;
				await wait(timer / 2);
				blocks[j].style.backgroundColor = "#028c6a";
				blocks[j - 1].style.backgroundColor = "#028c6a";

				// swap logic using array destructuring
				[array[j], array[j - 1]] = [array[j - 1], array[j]];

				blocks[i + 1].style.backgroundColor = "greenyellow";
				// blocks[j].style.backgroundColor = "greenyellow";
				// Waiting Timer
				timer = 3000 - sortingSpeed() * 580;
				await wait(timer / 2);
			}
		}
		generateArrayFromData(array);
	}

	async function finalSortColor() {
		const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		generateArrayFromData(array);
		let blocks = document.querySelectorAll(".element");
		for (let j = 0; j < array.length; j++) {
			console.log("running");
			blocks[j].style.backgroundColor = "#028c6a";
		}
		let timer = 3000 - sortingSpeed() * 580;
		await wait(timer / 10);
		alert("Sorting Done 🥳");
	}

	finalSortColor();
}

export { insertionSort };

// vector<int> selectionSort(vector<int> arr) {
//   int size = arr.size();
//   for (int i = 0; i < size - 1; i++) {
//     // sorting till i part of the array
//     for (int j = i + 1; j > 0; j--) {
//       // swap if the previous elment in the sorted part of the array is less
//       // then the current element
//       if (arr[j] < arr[j - 1]) {
//         swap(arr[j], arr[j - 1]);
//       }
//     }
//   }

//   return arr;
// }
