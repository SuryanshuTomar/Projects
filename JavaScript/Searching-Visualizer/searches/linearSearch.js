import { searchSpeed } from "../app.js";

async function linearSearch(target) {
	let resultIndex = -1;
	const arrayList = document.getElementsByClassName("element");
	let arrls = Array.from(arrayList);

	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	arrls.forEach((element) => {
		element.setAttribute("class", "element");
	});

	for (let index = 0; index < arrls.length; index++) {
		let timer = 3000 - Number(searchSpeed) * 500;
		arrls[index].classList.add("current");
		await wait(timer);
		if (+arrls[index].textContent == target) {
			resultIndex = index;
			arrls[index].classList.remove("current");
			arrls[index].classList.add("active");
			return resultIndex;
		}
		arrls[index].classList.remove("current");
		arrls[index].classList.add("not-active");
		await wait(timer);
	}
	return resultIndex;
}

export { linearSearch };
