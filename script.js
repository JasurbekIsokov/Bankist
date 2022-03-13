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

//localStorage.setItem('account1', account1);
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

// Time Out Opacity: 0;

setInterval(() => {
  containerApp.style.opacity = 0;
}, 300000);

// /Time Out Opacity: 0;

// /Time Out Close

setInterval(() => {
  window.location.reload('/');
}, 300000);

// /Time Out Close

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
  sumin = obj.movements
    .filter(function (val) {
      return val > 0;
    })
    .reduce(function (sumsum, val) {
      return sumsum + val;
    }, 0);

  out = obj.movements
    .filter(function (val) {
      return val < 0;
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

btnLogin.addEventListener('click', function (a) {
  a.preventDefault(); // HTML formadagi default holatlarni o'chirish

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

// const ekrangaTransferlarniChiqarish = function (obj) {
//   containerMovements.innerHTML = '';
//   obj.movements.forEach(function (val, key) {});
// };

// /Ekranga transferni chiqarish.

// Transform

let transferUser;

btnTransfer.addEventListener('click', function (b) {
  b.preventDefault();
  // HTML formadagi default holatlarni o'chirish

  const transferAmount = Number(inputTransferAmount.value);

  let transferTo = accounts.find(function (val) {
    return val.username === inputTransferTo.value;
  });
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    transferAmount > 0 &&
    sum(kirganUser) >= transferAmount &&
    inputTransferTo.username !== kirganUser.username
  ) {
    // console.log('k');
    kirganUser.movements.push(-transferAmount);
    transferTo.movements.push(transferAmount);
  }

  // console.log(kirganUser.movements);

  // console.log(transferTo);

  ekrangaTranzaksiyalarniChiqarish(kirganUser);

  statistika(kirganUser);

  labelSumIn.textContent = `${sumin} €`;

  labelSumOut.textContent = `${Math.abs(out)} €`;

  labelSumInterest.textContent = `${Math.abs(komissiya)} €`;

  labelBalance.textContent = `${sum(kirganUser)} €`;
});

// /Transform

// Request loan

btnLoan.addEventListener('click', function (b) {
  b.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  let qarzSum = sum(kirganUser) * 0.1;

  if (loanAmount > 0 && qarzSum > loanAmount) {
    console.log('k');
    kirganUser.movements.push(loanAmount);
  }

  ekrangaTranzaksiyalarniChiqarish(kirganUser);

  statistika(kirganUser);

  labelBalance.textContent = `${sum(kirganUser)} €`;

  labelSumIn.textContent = `${sumin} €`;

  inputLoanAmount.value = inputLoanAmount.value = '';
});

// /Request loan

// Close account

btnClose.addEventListener('click', function (b) {
  b.preventDefault();

  if (
    inputCloseUsername.value === kirganUser.username &&
    Number(inputClosePin.value) === kirganUser.pin
  ) {
    const close = accounts.findIndex(function (val) {
      return val.username === kirganUser.username;
    });

    console.log(close);

    accounts.splice(close, 1);

    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputCloseUsername.value = '';

    inputClosePin.value = inputClosePin.value = '';
  }
});

// /Close account

// Sort and UnSort

let bool = 1;

btnSort.addEventListener('click', function (arr) {
  // b.preventDefault();

  if (bool) {
    kirganUser.movements.sort((a, b) => a - b);
    bool = 0;
  } else {
    kirganUser.movements = [...movements];
    bool = 1;
  }

  ekrangaTranzaksiyalarniChiqarish(kirganUser);
});

// /Sort and UnSort

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

//  Time :

// let date = new Date();
// let mmb = date.getMinutes();
// let ssb = date.getSeconds();

// function currentTime() {
//   let date = new Date();
//   let mm = date.getMinutes();
//   let ss = date.getSeconds();

//   if (mm < 10) {
//     mm = '0' + mm;
//   }

//   if (ss < 10) {
//     ss = '0' + ss;
//   }

//   let time = `${mm}:${ss}`;

//   document.getElementById('time').innerText = time;

//   setTimeout(function () {
//     currentTime();
//     console.log(new Date().getTime() / 31536000);
//   }, 1000);
// }

// currentTime();

// /////////////////////////////////////////

// Secundomer

let min = document.getElementById('min');
let sec = document.getElementById('sec');

let nullmin = 4;
let nullsec = 59;

setInterval(() => {
  min.innerHTML = nullmin;
  sec.innerHTML = nullsec;

  nullsec--;

  if (nullsec <= 0) {
    nullmin--;
    nullsec = 59;
  } else if (nullmin >= 60) {
    nullmin--;
  }
}, 1000);

// /Secundomer
