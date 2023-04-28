const main = document.getElementById('main');
const addBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Double each person's money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort users by Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

// Calculate total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(provideData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  provideData.forEach((newUser) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${newUser.name}</strong>
    ${formatMoney(newUser.money)}`;
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showBtn.addEventListener('click', showMillionaires);
calcBtn.addEventListener('click', calculateWealth);
