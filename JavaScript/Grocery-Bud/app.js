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

// ****** FUNCTIONS **********
function addItem(event) {
	event.preventDefault();
	const value = grocery.value;
	const id = new Date().getTime().toString();

	if (value && !editFlag) {
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
		// display alert
		displayAlert("item added to the list", "success");
		// show container
		container.classList.add("show-container");

		// add to local storage
		addToLocalStorage(id, value);

		// set back to default
		setBackToDefault(event.target.value);
	} else if (value && editFlag) {
		console.log("Editing");
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
function editItem() {
	console.log("item edit");
}

// delete function
function deleteItem() {
	
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
	console.log("added to local storage");
}

// ****** SET BACK TO DEFAULT **********
function setBackToDefault() {
	grocery.value = "";
	editFlag = false;
	editId = "";
	submitBtn.textContent = "Submit";
}

// ****** SETUP ITEMS **********
