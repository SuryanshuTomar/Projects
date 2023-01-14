import FullList from "../model/FullList";

interface DOMList {
	ul: HTMLUListElement;
	clear(): void;
	render(fullList: FullList): void;
}

// Applying Singleton pattern: Meaning there will be only one instance of this class
// and that's why we are making this class constructor as private and initializing its
// instance in the class itself.
export default class ListTemplate implements DOMList {
	ul: HTMLUListElement;

	static instance: ListTemplate = new ListTemplate();

	private constructor() {
		this.ul = document.getElementById("listItems") as HTMLUListElement;
	}

	clear(): void {
		this.ul.innerHTML = "";
	}

	render(fullList: FullList): void {
		this.clear();

		fullList.list.forEach((listItem) => {
			// <li class="item">
			//    <input type="checkbox" id="1">
			//    <label for="1">eat</label>
			//    <button class="button">X</button>
			// </li>
			const li = document.createElement("li") as HTMLLIElement;
			li.className = "item";

			// <input type="checkbox" id="1">
			const check = document.createElement("input") as HTMLInputElement;
			check.type = "checkbox";
			check.id = listItem.id;
			check.checked = listItem.checked;
			li.append(check);

			check.addEventListener("change", () => {
				listItem.checked = !listItem.checked;
				fullList.save();
			});

			// <label for="1">eat</label>
			const label = document.createElement("label") as HTMLLabelElement;
			label.htmlFor = listItem.id;
			label.textContent = listItem.item;
			li.append(label);

			// <button class="button">X</button>
			const button = document.createElement("button") as HTMLButtonElement;
			button.className = "button";
			button.textContent = "X";
			li.append(button);

			button.addEventListener("click", () => {
				fullList.removeItem(listItem.id);
            // render the updated fullList
				this.render(fullList);
			});

			// append the li to the ul
			this.ul.append(li);
		});
	}
}
