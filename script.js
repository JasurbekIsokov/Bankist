'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jasurbek Isokov',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Joraqozi Turdialiyev',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Jonibek Munirov',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Umid Rustamov',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

accounts.forEach(function (val) {
  val.username = val.owner
    .toLowerCase()
    .split(' ')
    .map(function (val) {
      return val[0];
    })
    .join('');
});

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

// Functions

const ekrangaTranzaksiyalarniChiqarish = function (obj) {
  containerMovements.innerHTML = '';
  obj.movements.forEach(function (val, key) {
    let tekshir = val > 0 ? `deposit` : `withdrawal`;

    let qalay = `<div class="movements__row">
    <div class="movements__type movements__type--${tekshir}">
    ${key + 1} ${tekshir} </div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${val} € </div>
   </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', qalay);
  });
};

const sum = function (obj) {
  let yig = obj.movements.reduce(function (yig, val) {
    return yig + val;
  }, 0);

  return yig;
};

let sumin = 0;
let out = 0;
let komissiya = 0;

const statistika = function (obj) {
  out = obj.movements
    .filter(function (val) {
      return val < 0;
    })
    .reduce(function (sumsum, val) {
      return sumsum + val;
    }, 0);

  sumin = obj.movements
    .filter(function (val) {
      return val > 0;
    })
    .reduce(function (sumsum, val) {
      return sumsum + val;
    }, 0);

  komissiya = obj.movements
    .filter(function (val) {
      return val < 0;
    })
    .map(function (val) {
      return (val * obj.interestRate) / 100;
    })
    .reduce(function (sumsum, val) {
      return sumsum + val;
    }, 0);
};

let kirganUser;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // HTML formadagi default holatlarni o'chirish

  let login = inputLoginUsername.value;

  let parol = Number(inputLoginPin.value);

  kirganUser = accounts.find(function (val) {
    return val.username === login;
  });

  if (kirganUser?.pin === parol) {
    labelWelcome.textContent = `Welcome ${kirganUser.owner}`;
    labelWelcome.style.color = `#333`;
    containerApp.style.opacity = 1;
    inputLoginUsername.value = inputLoginPin.value = '';
  } else {
    labelWelcome.textContent = `Try again!`;
    labelWelcome.style.color = `red`;
    inputLoginUsername.value = inputLoginPin.value = '';
  }
  // if (!kirganUser) {
  //   labelWelcome.textContent = `Try again!`;
  //   labelWelcome.style.color = `red`;
  // }

  ekrangaTranzaksiyalarniChiqarish(kirganUser);

  labelBalance.textContent = `${sum(kirganUser)} €`;

  statistika(kirganUser);

  labelSumIn.textContent = `${sumin} €`;

  labelSumOut.textContent = `${Math.abs(out)} €`;

  labelSumInterest.textContent = `${Math.abs(komissiya)} €`;
});

// Homework

// Ekranga transferni chiqarish.

const ekrangaTransferlarniChiqarish = function (obj) {
  containerMovements.innerHTML = '';
  obj.movements.forEach(function (val, key) {});
};

// /Ekranga transferni chiqarish.

// Transform

let transferUser;

btnTransfer.addEventListener('click', function (b) {
  b.preventDefault(); // HTML formadagi default holatlarni o'chirish

  let transferTo = inputTransferTo.value;

  let transferAmount = Number(inputTransferAmount.value);

  transferUser = accounts.find(function (val) {
    return val.username === transferTo;
  });
});

// /Transform

// Request loan

btnLoan.addEventListener('click', function (b) {
  b.preventDefault();

  let LoanAmount = Number(inputLoanAmount.value);
});

// /Request loan

// Close account

btnClose.addEventListener('click', function (b) {
  b.preventDefault();

  let CloseUsername = inputCloseUsername.value;

  let ClosePin = Number(inputClosePin.value);
});

// /Close account

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//
//
//
//
//
//
//

// let x = accounts.find(function (val) {
//   return val.username === 'js';
// });

// console.log(x);

// let arr = [1, 2, 3, 4, 5, 6];

// let y = arr.find(function (val) {
//   return val == 3;
// });

// console.log(y);

// const obj1 = {
//   fname: 'Isokov',
//   lname: 'Jasur',
//   age: 20,
//   university: 'TUIT',
// };

// const obj2 = {
//   fname: 'Isokov',
//   lname: 'Ulugbek',
//   age: 20,
//   university: 'TUIT',
// };

// const obj3 = {
//   fname: 'Turdialiyv',
//   lname: 'Joraqozi',
//   age: 21,
//   university: 'TUIT',
// };

// let arr = [obj1, obj2, obj3];

// let y = arr.find(function (val) {
//   return val.fname == 'Isokov';
// });

// console.log(y);
