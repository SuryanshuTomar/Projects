const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let tempDateObj = new Date();
const tempYear = tempDateObj.getFullYear();
const tempMonth = tempDateObj.getMonth();
const tempDate = tempDateObj.getDate();

let dateObj = new Date(tempYear, tempMonth, tempDate + 10, 30, 30, 0);
const year = dateObj.getFullYear();
const month = dateObj.getMonth();
const hours = dateObj.getHours();
const day = dateObj.getDay();
const minute = dateObj.getMinutes();
const date = dateObj.getDate();

giveaway.textContent = `Giveaways ends on ${weekdays[day]},
${date} ${months[month]} ${year} ${hours}:${minute}`;

// Future time in ms
const futureTime = dateObj.getTime();

// get the remaining time for giveaway
function getRemainingTime() {
    const today = new Date().getTime();
    const time = futureTime - today;
    // console.log(time);

    // values in ms
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let days = Math.floor(time / oneDay);
    let hours = Math.floor((time % oneDay) / oneHour);
    let mins = Math.floor((time % oneHour) / oneMinute);
    let secs = Math.floor((time % oneMinute) / 1000);

    // set value arrays
    const values = [days, hours, mins, secs];

    // formatting date
    function format(item) {
        if (item < 10) {
            return (item = `0${item}`);
        }
        return item;
    }

    items.forEach((item, index) => {
        item.innerHTML = format(values[index]);
    });

    if (time < 0) {
        clearInterval(countDown);
        deadline.innerHTML = `<h4 class="expired"> Sorry, This giveway has already completed !!!</h4>`;
    }
}

//Countdown
let countDown = setInterval(getRemainingTime, 1000);
