import { searchSpeed } from "../app.js";

async function binarySearch(target) {
	let resultIndex = -1;
	const arrayList = document.getElementsByClassName("element");
	let arrls = Array.from(arrayList);

	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	arrls.forEach((element) => {
		element.setAttribute("class", "element");
	});

	let start = 0;
	let end = arrls.length - 1;

	while (start <= end) {
		let timer = 3000 - Number(searchSpeed) * 500;
		let mid = start + Math.floor((end - start) / 2);
		arrls[start].classList.add("current");
		arrls[end].classList.add("current");
		arrls[mid].classList.add("active");
		await wait(timer);
		if (+arrls[mid].textContent == target) {
			resultIndex = mid;
			for (let i = mid; i <= end; i++) {
				arrls[i].classList.add("not-active");
			}
			arrls[mid].classList.remove("not-active");
			arrls[mid].classList.remove("active");
			arrls[mid].classList.add("wait-active");
			end = mid - 1;
			await wait(timer);
		} else if (target < +arrls[mid].textContent) {
			for (let i = mid; i <= end; i++) {
				arrls[i].classList.add("not-active");
			}
			end = mid - 1;
			await wait(timer);
		} else {
			for (let i = start; i <= mid; i++) {
				arrls[i].classList.add("not-active");
			}
			start = mid + 1;
			await wait(timer);
		}
	}

	if (resultIndex != -1) {
		arrls[resultIndex].classList.remove("current");
		arrls[resultIndex].classList.remove("not-active");
		arrls[resultIndex].classList.remove("wait-active");
		arrls[resultIndex].classList.add("active");
	}

	return resultIndex;
}

export { binarySearch };
