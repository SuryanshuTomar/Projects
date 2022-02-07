const value = document.querySelector("#value");
const increase = document.querySelector(".increase");
const reset = document.querySelector(".reset");
const decrease = document.querySelector(".decrease");
const btns = document.querySelectorAll(".btn");

//Method : 1
// increase.addEventListener("click", function () {
//   value.textContent = parseInt(value.textContent) + 1;
// });

// decrease.addEventListener("click", function () {
//   value.textContent = parseInt(value.textContent) - 1;
// });

// reset.addEventListener("click", function () {
//   value.textContent = parseInt(value.textContent) * 0;
// });

// Method : 2
let count = parseInt(value.textContent);
btns.forEach(function (button) {
  button.addEventListener("click", function () {
    // Setting value on button click
    if (button.classList.contains("decrease")) {
      count--;
    } else if (button.classList.contains("reset")) {
      count = 0;
    } else {
      count++;
    }

    //Setting value text color
    if (count > 0) value.style.color = "green";
    if (count < 0) value.style.color = "red";
    if (count === 0) value.style.color = "black";

    value.textContent = count;
  });
});
