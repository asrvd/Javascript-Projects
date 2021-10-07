const ctms = "11 Mar 2022"

const daysEl = document.getElementById('days')
const hoursEl = document.getElementById('hours')
const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')

function countdown() {
    const ctmsDate = new Date(ctms);
    const currentDate = new Date();
    const sec = (ctmsDate - currentDate) / 1000;
    const days = Math.floor(sec /3600 / 24);
    const hours = Math.floor((sec / 3600) % 24);
    const minutes = Math.floor((sec / 60) % 60);
    const seconds = Math.floor(sec % 60);
    // console.log(days, hours, minutes, seconds);

    daysEl.innerHTML = formattime(days);
    hoursEl.innerHTML = formattime(hours);
    minutesEl.innerHTML = formattime(minutes);
    secondsEl.innerHTML = formattime(seconds);
}

function formattime(time) {
    return time < 10 ? (`0${time}`) : time;
}

// initial call
countdown();
setInterval(countdown, 1000);
