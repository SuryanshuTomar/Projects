// data for contentElement
const content = [
	{
		heading: "Home",
		data: "Home Informations Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio velit ad culpa facilis? Harum et esse itaque delectus vitae commodi obcaecati illo eum? Sint, nihil necessitatibus nemo magni sed doloremque obcaecati pariatur blanditiis ea atque, quaerat quibusdam esse temporibus soluta? Sunt rerum nulla aut magnam. Odit reiciendis aliquid nostrum unde laboriosam magnam, soluta quia	blanditiis maxime amet temporibus corrupti modi ipsa dictatempore omnis excepturi quam natus corporis sint?	Reprehenderit adipisci harum nobis reiciendis similiquealiquam?",
	},
	{
		heading: "Price",
		data: "Pricing Informations Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio velit ad culpa facilis? Harum et esse itaque delectus vitae commodi obcaecati illo eum? Sint, nihil necessitatibus nemo magni sed doloremque obcaecati pariatur blanditiis ea atque, quaerat quibusdam esse temporibus soluta? Sunt rerum nulla aut magnam. Odit reiciendis aliquid nostrum unde laboriosam magnam, soluta quia blanditiis maxime amet temporibus corrupti modi ipsa dicta tempore omnis excepturi quam natus corporis sint? Reprehenderit adipisci harum nobis reiciendis similique aliquam?",
	},
	{
		heading: "About",
		data: " About Informations Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio velit ad culpa facilis? Harum etesse itaque delectus vitae commodi obcaecati illo eum? Sint, nihil necessitatibus nemo magni sed doloremque obcaecati pariatur blanditiis ea atque, quaerat quibusdam esse temporibus soluta? Sunt rerum nulla aut magnam. Odit reiciendis aliquid nostrum unde laboriosam magnam, soluta quia blanditiis maxime amet temporibus corrupti modi ipsa dicta tempore omnis excepturi quam natus corporis sint? Reprehenderit adipisci harum nobis reiciendis similique aliquam?",
	},
];

// Imports
const tabsContainer = document.querySelector(".tabs-container");
const headings = document.querySelectorAll(".heading");
const contentContainer = document.querySelector(".content-container");

// Load the first tab on
window.addEventListener("DOMContentLoaded", () => {
	createAndAppendElement(contentContainer, 0);
});

headings.forEach((element, index) => {
	// adding the content
	element.addEventListener("click", () => {
		// creating and appending the clicked element to the contentContainer
		createAndAppendElement(contentContainer, index);

		// Resetting the background-color of the non active heading
		headings.forEach((elem) => {
			if (elem.firstElementChild !== event.target) {
				elem.firstElementChild.style.backgroundColor =
					"lightgoldenrodyellow";
			}
		});

		// Setting the background-color of the active heading
		const headingElement = element.firstElementChild;
		headingElement.style.backgroundColor = "palegoldenrod";
	});
});

// Functions
function createAndAppendElement(container, index) {
	// creating a new element for the tabs content
	const contentElement = document.createElement("div");
	contentElement.classList.add("active");
	contentElement.innerHTML = getContentHTML(index);

	// appending the contentElement to the tabsContainer in the DOM
	container.innerHTML = "";
	container.appendChild(contentElement);
}

function getContentHTML(index) {
	return `
			<h1>${content[index].heading}</h1>
			<p>${content[index].data}</p>
      `;
}
