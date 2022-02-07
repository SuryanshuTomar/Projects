const colors = [
  "green",
  "red",
  "yellow",
  "purple",
  "blue",
  "orange",
  "black",
  "pink",
  "violet",
  "turquoise",
  "burlywood",
  "seaGreen",
  "yellowGreen",
];

const btn = document.querySelector(".btn");
const color = document.querySelector(".color");
const container = document.querySelector("main");

btn.addEventListener("click", function () {
  // Getting a random number between 0 and 3 for colors[] array length
  const randomNumber = getRandomNumber();
  //   console.log(randomNumber);
  color.textContent = colors[randomNumber];
  container.style.backgroundColor = colors[randomNumber];
});

function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}
