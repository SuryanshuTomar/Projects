import { arrayBlock } from "../app.js";

// Swap Function
function swap(el1, el2) {
	// For exchanging styles of two blocks
	let temp = el1.style.transform;
	el1.style.transform = el2.style.transform;
	el2.style.transform = temp;
	arrayBlock.insertBefore(el2, el1);
}
export { swap };
