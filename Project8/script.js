const search = document.getElementById('search'),
      submit = document.getElementById('submit'),
      random = document.getElementById('random'),
      mealsEL = document.getElementById('meals'),
      resultHeading = document.getElementById('result-heading'),
      single_mealEl = document.getElementById('single-meal');

function searchMeal(e){
    e.preventDefault();

    single_mealEl.innerHTML = '';
    const term = search.value;
    // console.log(term);
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
                if(data.meals === null){
                    resultHeading.innerHTML = `<p>There are no search results. Try again</p>`
                }else{
                    mealsEL.innerHTML = data.meals.map(meal => {
                        return `
                            <div class='meal'>
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                                <div class="meal-info" data-mealID="${meal.idMeal}">
                                    <h3>${meal.strMeal}</h3>    
                                </div>
                            </div>
                        `;
                    }).join('');
                }
            });
        search.value = '';
    }else{
        alert('PLease enter a search term!');
    }
}
function getMealByID(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        });
}

function addMealToDOM(meal){
    const ingredients = [];
    for(let i = 1; i <= 20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]} `);
        }else{
            break;
        }
    }
    console.log(meal);
    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}
function getRandomMeal(){
    mealsEL.innerHTML = '';
    resultHeading.innerHTML = ``;
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
}

submit.addEventListener('submit', searchMeal);
mealsEL.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info');
        }else
            return false;
    });
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealByID(mealID);
    }
});
random.addEventListener('click', getRandomMeal);
