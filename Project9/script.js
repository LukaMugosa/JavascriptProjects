const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
    {id: 1, text: 'Flower', amount: -20},
    {id: 2, text: 'Salary', amount: 300},
    {id: 3, text: 'Book', amount: -10},
    {id: 4, text: 'Camera', amount: 150}
];

let transactions = dummyTransactions;

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn">x</button>
    `;
    list.appendChild(item);
}

function addTransaction(e) {
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Text and amount fields can not be empty');
    }else{

    }
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc+=item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc+=item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc+=item), 0) * -1).toFixed(2);
    console.log(expense);
    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit',addTransaction);




