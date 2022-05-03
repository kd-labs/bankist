'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// function to display the transaction movements in account
const displayMovements = function (movements) {
  // clearing the html of root element
  containerMovements.innerHTML = '';

  // for-each on movements array
  movements.forEach(function (money, i) {
    // for-each on array takes a callback fn which takes the element and
    // index of element from array

    // calculate the type of movement i.e. deposit/withdrawal
    // based if money is positive or negative
    const movementType = money > 0 ? 'deposit' : 'withdrawal';

    // Task 1 : for each element in movements create html element
    //          using template literal
    const htmlElement = `        
        <div class="movements__row">
          <div class="movements__type movements__type--${movementType}">${
      i + 1
    } ${movementType}</div>
          <div class="movements__value">${money}€</div>
        </div>`;

    /* 
    Task 2 : add the html element in the beginiing of movements container
     How to add html element in dom from javascript
      1. get the root element from document object and method querySelector
         or getElementByClass or getElementById.
         const rootEl = document.querySelector(".movmements");
      2. There are many methods to insert html element in root element once
         one of them insertAdjacentHtml(position, string)
         where position = beforeBegin, afterBegin, beforeEnd, afterEnd of 
         root element
         and string is parsed as html by browser API and inserted in dom
         relative to root element
    */
    containerMovements.insertAdjacentHTML('afterbegin', htmlElement);
    console.log(money, i, movementType);
  });
};

displayMovements(account1.movements);

// const usernames = accounts.map(function (account) {
//   account.owner.split(' ').reduce((prev, curr) => {
//     console.log(prev, curr);
//     prev = curr.charAt(0);
//     console.log(prev);
//   }, '');
// });

const username = account1.owner.split(' ').reduce((prev, curr) => {
  console.log(prev, curr);
  prev = prev.concat(curr.charAt(0));
  console.log(prev);
}, '1');

console.log(username);

/////////////////////////////////////////////////
