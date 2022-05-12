// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener("click", clearItems);

// on DOM Load
window.addEventListener("DOMContentLoaded", setupItems);

// ****** FUNCTIONS **********
function addItem(event) {
	event.preventDefault();
	const value = grocery.value;
	const id = new Date().getTime().toString();

	if (value && !editFlag) {
		// adding item to list
		createListItems(id, value);
		// display alert
		displayAlert("item added to the list", "success");
		// show container
		container.classList.add("show-container");

		// add to local storage
		addToLocalStorage(id, value);

		// set back to default
		setBackToDefault(event.target.value);
	} else if (value && editFlag) {
		editElement.innerText = value;
		displayAlert("Item Edited", "success");
		grocery.value = "";
		// edit local storage
		editLocalStorage(editId, value);
		setBackToDefault();
	} else {
		displayAlert("Empty Value", "danger");
	}
}

function clearItems() {
	const items = document.querySelectorAll(".grocery-item");
	if (items.length > 0) {
		items.forEach(function (item) {
			list.removeChild(item);
		});
	}
	container.classList.remove("show-container");
	displayAlert("All items from the List are removed", "danger");
	// localStorage.removeItem("list");
	setBackToDefault();
}

// edit function
function editItem(event) {
	const element = event.currentTarget.parentElement.parentElement;
	// set edit item
	editElement = event.currentTarget.parentElement.previousElementSibling;
	// set form value
	grocery.value = editElement.innerText;
	editFlag = true;
	editId = element.dataset.id;
	submitBtn.textContent = "Edit";
}

// delete function
function deleteItem(event) {
	const element = event.currentTarget.parentElement.parentElement;
	const id = element.dataset.id;
	list.removeChild(element);
	if (list.children.length === 0) {
		container.classList.remove("show-container");
	}
	displayAlert("Item Removed from the list", "danger");
	setBackToDefault();
	// remove from localStorage
	removeFromLocalStorage(id);
}

// display alert
const displayAlert = (text, action) => {
	alert.textContent = text;
	alert.classList.add(`alert-${action}`);
	setTimeout(() => {
		alert.textContent = "";
		alert.classList.remove(`alert-${action}`);
	}, 1200);
};

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
	const grocery = { id, value };
	let items = getLocalStorage();
	items.push(grocery);
	localStorage.setItem("list", JSON.stringify(items));
}

// ****** SET BACK TO DEFAULT **********
function setBackToDefault() {
	grocery.value = "";
	editFlag = false;
	editId = "";
	submitBtn.textContent = "Submit";
}

function removeFromLocalStorage(id) {
	const items = getLocalStorage();
	const filteredItems = items.filter((item) => item.id !== id);
	localStorage.setItem("list", JSON.stringify(filteredItems));
}

function editLocalStorage(id, value) {
	const items = getLocalStorage();
	const editedItems = items.map((item) => {
		if (item.id === id) {
			item.value = value;
		}
		return item;
	});
	localStorage.setItem("list", JSON.stringify(editedItems));
}

function getLocalStorage() {
	return localStorage.getItem("list")
		? JSON.parse(localStorage.getItem("list"))
		: [];
}

// ****** SETUP ITEMS **********
function setupItems() {
	let items = getLocalStorage();
	if (items.length > 0) {
		items.forEach((item) => createListItems(item.id, item.value));
	}
	container.classList.add("show-container");
}

function createListItems(id, value) {
	console.log("Item Adding to list");
	const element = document.createElement("article");
	// add class
	element.classList.add("grocery-item");
	// add id
	const attr = document.createAttribute("data-id");
	attr.value = id;
	element.setAttributeNode(attr);
	element.innerHTML = `
			<p class="title">${value}</p>
				<div class="btn-container">
					<button class="edit-btn">
						<i class="fas fa-edit"></i>
					</button>
					<button class="delete-btn">
						<i class="fas fa-trash"></i>
					</button>
				</div>
		`;

	// Setting up the element buttons
	const deleteBtn = element.querySelector(".delete-btn");
	const editBtn = element.querySelector(".edit-btn");

	deleteBtn.addEventListener("click", deleteItem);
	editBtn.addEventListener("click", editItem);

	// append child
	list.appendChild(element);
	grocery.value = "";
}
