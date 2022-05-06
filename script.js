'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Kunal Das',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jaya Das',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Madhurima Das',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Mrinal Kanti Das',
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

const logoutTimerEl = document.querySelector('.logout-timer');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/********************* GLOBAL VARIABLES SECTION *********************/

let loggedAccount, logoutTimer;

/**********************************************************************/

/***************** GLOBAL EXECUTION CONTEXT CODE ********************/
// clearing the html of root element
containerMovements.innerHTML = '';
logoutTimerEl.style.display = 'none';

/**********************************************************************/

/******************To Render the movement of money*******************/

// function to display the transaction movements in account
const displayMovements = function (movements) {
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
    // console.log(money, i, movementType);
  });
};

// displayMovements(account1.movements);

/**********************************************************************/

/*********************CREATING USERNAMES ******************************/

/*
  1. Map Fn : Transforming owner of each account.
  2. Split Fn : To split the owner of the account.
  3. Reduce Fn : To reduce the owner of the account to their initials
      Syntax for reduce fn :
          list.reduct(function(prevVal, currEl) {
              // Reduction Logic to add currEl to prevVal
              return (combining currEl into prevVal) 
          }, initialVal);
*/

const ownerNames = accounts.map(function (account) {
  return account.owner
    .toLowerCase()
    .split(' ')
    .reduce((initials, name) => {
      return initials.concat(name.charAt(0));
    }, '');
});
console.log(ownerNames);

accounts.forEach(function (account) {
  account.username = account.owner
    .toLowerCase()
    .split(' ')
    .reduce((prevVal, currEl) => {
      return prevVal.concat(currEl.charAt(0));
    }, '');
});

console.log(accounts);

/**********************************************************************/

/*********************CALCULATING SUMMARIES ***************************/

const calcBalance = function (account) {
  const balance = account.movements.reduce((sum, val) => (sum += val), 0);
  account.balance = balance;
  labelBalance.textContent = `${balance} €`;
};

const calcDeposit = function (movements) {
  const deposit = movements
    .filter(money => money >= 0)
    .reduce((sum, amount) => (sum += amount), 0);
  labelSumIn.textContent = `${deposit} €`;
};

const calcWithdrawal = function (movements) {
  const withdrawal = movements
    .filter(money => money < 0)
    .reduce((sum, amount) => (sum += amount), 0);
  labelSumOut.textContent = `${-withdrawal} €`;
};

const calcInterest = function (account) {
  const interest = account.movements
    .filter(x => x >= 0)
    .map(function (val) {
      return (val * account.interestRate) / 100;
    })
    .reduce((sum, val) => (sum += val), 0)
    .toFixed(2);
  console.log(`Interest earned on deposits : ${interest}`);
  labelSumInterest.textContent = interest;
};

const calcDisplaySummary = function (account) {
  calcBalance(account);
  calcDeposit(account.movements);
  calcWithdrawal(account.movements);
  calcInterest(account);
};

const updateUI = function (account) {
  displayMovements(account.movements);
  calcDisplaySummary(account);
};

// calcDisplaySummary(account1);

/**********************************************************************/

/****************IMPLEMENTING LOGIN FUNCTIONALITY *********************/

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  const enteredUsername = inputLoginUsername.value;
  const enteredPin = inputLoginPin.value;

  // Check if enteredUsername and enteredPin are truthy values
  if (enteredUsername && enteredPin) {
    // Find the matching account
    loggedAccount = accounts.find(
      account =>
        account.username === enteredUsername &&
        account.pin === Number(enteredPin)
    );

    !loggedAccount && console.log('Invalid login');

    if (loggedAccount) {
      // Clear the input fields and take away the focus from them
      inputLoginUsername.value = '';
      inputLoginPin.value = '';

      inputLoginUsername.blur();
      inputLoginPin.blur();

      // Call function to display movement, balance, deposit, withdrawal, interest and welcome user

      logoutTimerEl.style.display = '';
      labelWelcome.textContent = `Welcome back ${
        loggedAccount.owner.split(' ')[0]
      }`;
      updateUI(loggedAccount);

      // Remove the opacity so movement and summaries can be displayed
      containerApp.style.opacity = 100;
      if (logoutTimer) clearInterval(logoutTimer);
      logoutTimer = startTimer();
    }
  }
});

/**********************************************************************/

/****************IMPLEMENTING LOGOUT FUNCTIONALITY *********************/

const startTimer = function () {
  let time = 120;

  // creating function which counts down the timer
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      /* 
        Logout the user
        By making the opacity to 0 and making the welcome message back to initial value
        clear logout timer 
      */
      clearInterval(logoutTimer);
      labelWelcome.textContent = 'Login to get started';
      containerApp.style.opacity = 0;
    }

    time--;
  };
  tick();
  const logoutTimer = setInterval(tick, 1000);
  return logoutTimer;
};

/**********************************************************************/

/****************IMPLEMENTING TRANSFER FUNCTIONALITY ******************/

//Adding event listener to click event to transfer button
btnTransfer.addEventListener('click', function (event) {
  // preventing default reload behaviour on form submission
  event.preventDefault();

  const transferTo = inputTransferTo.value;
  const transferAmount = Number(inputTransferAmount.value);

  // find fn to find the recipient account
  const transferToAccount = accounts.find(
    account => account.username === transferTo
  );

  // checking if recipient account is valid and the transferred amount is less than equal to balance of loggedAccount
  if (
    transferToAccount?.username !== loggedAccount.username &&
    transferAmount > 0 &&
    loggedAccount.balance >= transferAmount
  ) {
    // pushing a positive transfer i.e. deposit to recipient's movements
    transferToAccount.movements.push(transferAmount);
    // pushing a negative transfer i.e. withdrawal to loggedUser's movements
    loggedAccount.movements.push(-transferAmount);

    // calling calcDisplaySummary() and displayMovement for current
    // account after transfer
    updateUI(loggedAccount);

    // clear previous existing timer
    if (logoutTimer) clearInterval(logoutTimer);
    // start new timer and return timer id
    logoutTimer = startTimer();
  } else {
    console.log('Invalid Recipient or balance not enough');
  }
  // resetting the transfer form
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();
});

/**********************************************************************/

/****************IMPLEMENTING LOAN FUNCTIONALITY ******************/

// add event listener to to loan request button
btnLoan.addEventListener('click', function (event) {
  // preventing default behavior of form
  event.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);

  // Some Fn : Checking if some elements in movements array are greater than
  // 10% of requested amount

  setTimeout(function () {
    const loanRequestValid =
      loggedAccount.movements
        .filter(mov => mov > 0)
        .some(mov => mov > 0.1 * loanAmount) &&
      loggedAccount.movements.push(loanAmount);

    updateUI(loggedAccount);
    console.log(`Loan Amount ${loanAmount} approved`);
  }, 3000);

  if (logoutTimer) clearInterval(logoutTimer);
  logoutTimer = startTimer();
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

/**********************************************************************/

/************************* ARRAYS PRACTICE ****************************/

console.log('Arrays Practice Exercises Begins');

/******** Task 1 : Calculate all Deposits ************/

const allDeposits = accounts
  .flatMap(function (account) {
    return account.movements.filter(mov => mov > 0);
  })
  .reduce((sum, deposit) => (sum += deposit), 0);

console.log(`all Deposits in bank : ${allDeposits}`);

/****************************************************/

/******** Task 2 : Count Deposits >= 1000 ************/

// Approach 1 : Using length property
const atLeast1000DepositsCount1 = accounts.flatMap(function (account) {
  return account.movements.filter(mov => mov >= 1000);
}).length;

// Approach 2 : Using reduce method
const atLeast1000DepositsCount2 = accounts
  .flatMap(function (account) {
    return account.movements.filter(mov => mov >= 1000);
  })
  .reduce((count, val) => (count += 1), 0);

console.log(
  `Count of deposits at least 1000 in bank : ${atLeast1000DepositsCount2}`
);

/****************************************************/

/**** Task 3 : Create object containing deposits and withdrawal using reduce ********/

const { deposits, withdrawals } = accounts
  .flatMap(account => account.movements)
  .reduce(
    (sums, currVal) => {
      currVal > 0 ? (sums.deposits += currVal) : (sums.withdrawals += -currVal);
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(
  `All deposits and withdrawals in bank : ${deposits} , ${withdrawals}`
);

/****************************************************/

/////////////////////////////////////////////////
