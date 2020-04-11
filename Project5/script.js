const main  = document.getElementById('main');
const addUserBtn  = document.getElementById('add-user');
const doubleBtn  = document.getElementById('double');
const showMillionairesBtn  = document.getElementById('show-millionaires');
const sortBtn  = document.getElementById('sort');
const calculateWealthBtn  = document.getElementById('calculate-wealth');

let data = [];

//fetch random user and add money

// getRandomUser();
// getRandomUser();
// getRandomUser();

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
}
// Kad se nesto mapira znaci da se vrace novonastali niz
function doubleMoney() {
    data = data.map((user) => {
        return {...user, money: user.money*2};
    });
    updateDOM();
}
function sortByRichest() {
    data.sort((a,b) => {
        return b.money - a.money;
    });
    updateDOM();
}
function showOnlyMilionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

function addData(obj) {
    data.push(obj);
    updateDOM();
}
function calculateWealth() {
    const wealth  = data.reduce((acc,user) => (acc += user.money), 0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

function updateDOM(providedData = data) {
    //cleat the Main DIV
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    providedData.forEach( item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}
// (12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
function formatMoney(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
showMillionairesBtn.addEventListener('click',showOnlyMilionaires);
calculateWealthBtn.addEventListener('click',calculateWealth);