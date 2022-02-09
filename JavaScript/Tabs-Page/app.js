const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

about.addEventListener("click", function (e) {
    const btnId = e.target.dataset.id;

    if (btnId) {
        // remove active from other Buttons and adding to the clicked button
        btns.forEach(function (btn) {
            btn.classList.remove("active");
            e.target.classList.add("active");
        });

        // hiding all articles and only showing the one with the matching button btnId
        articles.forEach(function (article) {
            article.classList.remove("active");
        });
        const element = document.getElementById(btnId);
        element.classList.add("active");
    }
});
