import { arrayContainer } from "../app.js";
import { sortingSpeed } from "../app.js";

// Promise to swap two blocks
export default function swap(el1, el2) {
	return new Promise((resolve) => {
		// For exchanging styles of two blocks
		let temp = el1.style.transform;
		el1.style.transform = el2.style.transform;
		el2.style.transform = temp;

		window.requestAnimationFrame(function () {
			console.log("Sort Speed: ", sortingSpeed());
			// For waiting for .25 sec
			setTimeout(() => {
				arrayContainer.insertBefore(el2, el1);
				resolve();
			}, 5000 - sortingSpeed() * 50);
		});
	});
}
