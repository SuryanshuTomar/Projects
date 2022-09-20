// Imports
const uploadBtn = document.querySelector(".upload");
const progressValue = document.querySelector("#progress-value");
const progressBar = document.querySelector(".progress-bar");

// Events
uploadBtn.addEventListener("click", () => upload());
progressValue.addEventListener("change", changeProgressBar);
progressValue.addEventListener("keyup", changeProgressBar);

// Event Handlers
function changeProgressBar(event) {
	progressBar.removeAttribute("id");
	let inputValue = Number(event.target.value);
	if (inputValue > 100) inputValue = 100;
	progressBar.style.width = `${inputValue}%`;
	progressBar.textContent = `${inputValue}%`;
}
function upload() {
	progressBar.setAttribute("id", "play-animation");
	progressBar.textContent = `Uploading....`;
	setTimeout(() => {
		progressBar.textContent = `Uploading Complete !!!`;
	}, 4000);
}
