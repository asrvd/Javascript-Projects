var la = document.getElementById('left-btn');
var ra = document.getElementById('right-btn');
var cardsEl = document.querySelector('.cards');
const addBtn = document.getElementById('add-btn');
const cbtn = document.getElementById("close-btn");
const cardl = document.querySelectorAll('.card');
var length = cardl.length;

let x = 0;

ra.addEventListener("click", (e) => {
    e.preventDefault();
    const cards = document.querySelectorAll('.card');
    console.log(cards.length);
    if(x > -700 * (cards.length - 1)){
        x = x - 700;
        console.log(x);
        cardsEl.style.left = x + "px";
        const currCard = document.querySelector('.card.view');
        const nextCard = currCard.nextElementSibling
            ? currCard.nextElementSibling
            : document.querySelector(".cards").firstElementChild;
        currCard.classList.remove("view");
        nextCard.classList.add("view");
    }
    
})

la.addEventListener("click", (e) => {
    e.preventDefault();
    const cards = document.querySelectorAll('.card');
    if(x < 0) {
        x = x + 700;
        console.log(x);
        cardsEl.style.left = x + "px";
        const currCard = document.querySelector('.card.view');
        const prevCard = currCard.previousElementSibling
            ? currCard.previousElementSibling
            : document.querySelector(".cards").lastElementChild;
        currCard.classList.remove("view");
        prevCard.classList.add("view");
    }
})

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-header">
            <input type="text" name="" id="note-header" placeholder="Enter Title">
        </div>
        <textarea name="note" placeholder="Take Note.." id="" cols="30" rows="10"></textarea>
    `
    const cards = document.querySelectorAll('.card');
    cardsEl.appendChild(card);
    const currCard = document.querySelector('.card.view');
    const nextCard = currCard.nextElementSibling
            ? currCard.nextElementSibling
            : document.querySelector(".cards").firstElementChild;
    currCard.classList.remove("view");
    nextCard.classList.add("view");
    x = x - 700;
    cardsEl.style.left = x + "px";
})

cbtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const cards = document.querySelectorAll('.card');
    if (cards.length > 1) {
        console.log(`length = ${length} and clength = ${cards.length - 1}`)
        if (x === -700 * (cards.length - 1)) {
            x = x + 700;
            const currCard = document.querySelector('.card.view');
            const prevCard = currCard.previousElementSibling
            ? currCard.previousElementSibling
            : document.querySelector(".cards").lastElementChild;
            cardsEl.removeChild(currCard);
            cardsEl.style.left = x + "px";
            //currCard.classList.remove('view');
            prevCard.classList.add("view");
        } else if (x == 0 || x < 0) {
            x = x - 700;
            console.log(x);
            const currCard = document.querySelector('.card.view');
            const nextCard = currCard.nextElementSibling
            ? currCard.nextElementSibling
            : document.querySelector(".cards").firstElementChild;
            cardsEl.removeChild(currCard);
            cardsEl.style.left = x + "px";
            nextCard.classList.add("view");
        };
    }
})

