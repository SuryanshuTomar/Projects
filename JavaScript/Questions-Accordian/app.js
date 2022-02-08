// traversing the dom
// Method - 1
// const questionBtns = document.querySelectorAll(".question-btn");
// questionBtns.forEach(function (btn) {
//   btn.addEventListener("click", function (e) {
//     // console.log(e.currentTarget.parentElement.parentElement);
//     e.currentTarget.parentElement.parentElement.classList.toggle("show-text");
//   });
// });

//using selectors inside the element
// Method - 2
const questions = document.querySelectorAll(".question");
questions.forEach(function (question) {
  //   console.log(question);
  const btn = question.querySelector(".question-btn");
  //   console.log(btn);
  btn.addEventListener("click", function () {
    questions.forEach(function (item) {
      //   console.log(item);
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });

    question.classList.toggle("show-text");
  });
});
