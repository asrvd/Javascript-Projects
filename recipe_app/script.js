const mealsEl = document.getElementById('meals');
const favcont = document.getElementById('fav-meals');
const searchTerm = document.getElementById('search-term');
const searchbtn = document.getElementById('search');
const mealPopup = document.getElementById('meal-popup');
const mealPopupbtn = document.getElementById('close-popup');
const mealInfoEl = document.getElementById('meal-info');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    return randomMeal
}

async function getMealBySearch(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
    const respData = await resp.json();
    const randomMeal = respData.meals;
    return randomMeal
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random">Random Recipe</span>` : ''}
            <img src=${random ? mealData.strMealThumb : ''} alt=${random ? mealData.strMeal : ''}>
        </div>
        <div class="meal-body">
            <h4>${random ? mealData.strMeal : ''}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    const btn = meal.querySelector(".meal-body .fav-btn");
    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }
        fetchFavMeals();
    });

    meal.addEventListener("click", () => {
        updateMealInfo(mealData);
    })

    mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
    const mealIds = getMealLS();

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    const mealIds = getMealLS();

    localStorage.setItem(
        "mealIds",
        JSON.stringify(
            mealIds.filter((id) => id !== mealId)
        )
    );
}

function getMealLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? [] : mealIds;
    
}

async function fetchFavMeals() {
    // clean the container
    favcont.innerHTML = "";
    const mealIds = getMealLS();

    for(let i=0; i<mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);
        addMealFav(meal);
    }
}

function addMealFav(meald) {
    const favmeal = document.createElement('li');
    favmeal.innerHTML = `
        <li>
        <img src=${meald.strMealThumb} alt=${meald.strMeal}>
        <span>${meald.strMeal}</span>
        </li>
        <button class="clear"><i class="far fa-times-circle"></i></button>
    `;

    const btn2 = document.querySelector(".meal-body .fav-btn");
    const btn = favmeal.querySelector('.clear');
    btn.addEventListener("click", () => {
        removeMealLS(meald.idMeal);
        btn2.classList.remove("active");
        fetchFavMeals();
    });

    favmeal.addEventListener("click", () => {
        updateMealInfo(meald);
    })

    favcont.appendChild(favmeal)
}

searchbtn.addEventListener("click", async () => {
    mealsEl.innerHTML = "";
    const search = searchTerm.value;
    const meals = await getMealBySearch(search);
    console.log(meals);
    if (meals) {
        meals.forEach((meal) => {
        addMeal(meal, true);
    })}
})

function updateMealInfo(mealData) {
    mealInfoEl.innerHTML = ""
    // update meal info
    mealEl = document.createElement('div');

    // Ingredient Part
    const ingred = [];
    for (let i=1; i <= 20; i++) {
        if (mealData['strIngredient'+i]) {
            ingred.push(`${mealData['strIngredient'+i]} -> ${mealData['strMeasure'+i]}`)
        } else {
            break;
        };
    }

    mealEl.innerHTML = `
        <div>
            <h1>${mealData.strMeal}</h1>
            <img src=${mealData.strMealThumb} alt="">
            <h3>Ingredients Needed ~</h3>
            <ul>
                ${ingred.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
            <h3>Istructions ~</h3>
            <p>${mealData.strInstructions}</p>
        </div>
    `
    mealInfoEl.appendChild(mealEl);
    // show info
    mealPopup.classList.remove('hidden');

}

mealPopupbtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");

})