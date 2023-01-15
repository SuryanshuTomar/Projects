import "./css/style.css";
import ListItem from "./model/ListItem";
import FullList from "./model/FullList";
import ListTemplate from "./template/ListTemplate";

// Initialize App
const initApp = (): void => {
	const fullList = FullList.instance;
	const template = ListTemplate.instance;

	// get our form
	const itemEntryForm = document.getElementById(
		"itemEntryForm"
	) as HTMLFormElement;

	// add event listener to our form itemEntryForm
	itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
		event.preventDefault();

		const input = document.getElementById("newItem") as HTMLInputElement;
		const newEntryText: string = input.value.trim();

		// simply return if the input is empty
		if (!newEntryText) return;
		// if (!newEntryText.length) return;

		// calculate the listItem id
		const itemId: number = fullList.list.length
			? parseInt(fullList.list[fullList.list.length - 1].id)
			: 1;

		// create new item
		const newItem = new ListItem(itemId.toString(), newEntryText);

		// add the new item to the fullList
		fullList.addItem(newItem);

		// render the updated fullList to the page
		template.render(fullList);
	});

	// get clear items button
	const clearItems = document.getElementById(
		"clearItemsButton"
	) as HTMLButtonElement;

	// add event listener to the clearItems button
	clearItems.addEventListener("click", (): void => {
		fullList.clearList();
		template.clear();
	});

	// load our list and render on page.
	fullList.load();
	template.render(fullList);
};

// initialize only after our dom content is loaded
document.addEventListener("DOMContentLoaded", initApp);
