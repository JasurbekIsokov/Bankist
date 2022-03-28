'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

const account1 = {
  owner: 'Jasurbek Isokov',
  movements: [200, 450, -400, 3000, -650, -130, 7000, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDate: [
    `2022-03-16T11:28:20.429Z`,
    `2022-03-15T11:28:20.429Z`,
    `2022-03-14T11:28:20.429Z`,
    `2022-03-13T11:28:20.429Z`,
    `2022-03-10T11:28:20.429Z`,
    `2022-03-09T11:28:20.429Z`,
    `2022-03-08T11:28:20.429Z`,
    `2022-03-07T11:28:20.429Z`,
    `2022-03-06T11:28:20.429Z`,
  ],
};

const account2 = {
  owner: 'Joraqozi Turdialiyev',
  movements: [5000, 9400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDate: [
    `2022-03-16T11:28:20.429Z`,
    `2022-03-15T11:28:20.429Z`,
    `2022-03-14T11:28:20.429Z`,
    `2022-03-12T11:28:20.429Z`,
    `2022-03-11T11:28:20.429Z`,
    `2022-03-10T11:28:20.429Z`,
    `2022-03-10T11:28:20.429Z`,
    `2022-02-15T11:28:20.429Z`,
    `2022-01-14T11:28:20.429Z`,
  ],
};

const account3 = {
  owner: 'Jonibek Munirov',
  movements: [2000, -200, 340, -300, -20, 5000, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDate: [
    `2022-03-16T11:28:20.429Z`,
    `2022-03-15T11:28:20.429Z`,
    `2022-03-14T11:28:20.429Z`,
    `2022-03-12T11:28:20.429Z`,
    `2022-03-11T11:28:20.429Z`,
    `2022-03-10T11:28:20.429Z`,
    `2022-03-10T11:28:20.429Z`,
    `2022-02-15T11:28:20.429Z`,
    `2022-01-14T11:28:20.429Z`,
  ],
};

const account4 = {
  owner: 'Umid Rustamov',
  movements: [430, 1000, 700, -550, 500, 9000, -100],
  interestRate: 1,
  pin: 4444,
  movementsDate: [
    `2022-03-16T11:28:20.429Z`,
    `2022-03-15T11:28:20.429Z`,
    `2022-03-14T11:28:20.429Z`,
    `2022-03-12T11:28:20.429Z`,
    `2022-03-11T11:28:20.429Z`,
    `2022-03-10T11:28:20.429Z`,
    `2022-03-10T11:28:20.429Z`,
    `2022-02-15T11:28:20.429Z`,
    `2022-01-14T11:28:20.429Z`,
  ],
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

const inputTransferAmount1 = document.querySelector('.form__input--amount');

const balanceDate = document.querySelector('.balance__date');
const date = document.querySelector('.date');
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
  let nowDate = new Date().getDate();

  let nowDateOy = new Date().getMonth();

  let nowDateYil = new Date().getFullYear();
  let bugunMil = new Date(nowDateYil, nowDateOy, nowDate);

  console.log(`Bugun: ${bugunMil}`);
  console.log(new Date(1647452112564));
  obj.movements.forEach(function (val, key) {
    let tekshir = val > 0 ? `deposit` : `withdrawal`;

    let sanalar = new Date(
      obj.movementsDate[obj.movementsDate.length - key - 1]
    );
    // console.log(sanalar);
    let yil = sanalar.getFullYear();

    let oy = sanalar.getMonth() + 1;

    let kun = sanalar.getDate();

    let vaqt;

    if (nowDate == kun && nowDateYil == yil) {
      vaqt = 'Bugun';
    } else if (nowDate - kun == 1) {
      vaqt = 'Kecha';
    } else if (nowDate - kun <= 7) {
      vaqt = 'Yaqin bir hafta ichida';
    } else {
      vaqt = `${kun}/${oy}/${yil}`;
    }
    let qalay = `<div class="movements__row">
    <div class="movements__type movements__type--${tekshir}">
    ${key + 1} ${tekshir} </div>
    <div class="movements__date">${vaqt} </div>
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

  [...document.querySelectorAll('.movements__row')].forEach(function (
    val,
    key
  ) {
    if (key % 2 === 0) {
      val.style.backgroundColor = 'blue';
    } else if (key % 2 === 1) {
      val.style.backgroundColor = 'green';
    }
  });

  // Date ni chiqarish

  // let dateNow = new Date();

  // let yil = dateNow.getFullYear();

  // let oy = dateNow.getMonth() + 1;

  // let kun = dateNow.getDate();

  let hozirInternational = new Date();

  let options = {
    day: 'numeric',
    month: 'numeric',
    weekday: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  let davlat = navigator.language;

  console.log(davlat);

  let uzb = Intl.DateTimeFormat(davlat, options).format(hozirInternational);

  labelDate.textContent = uzb;

  //  /Date ni chiqarish

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

  if (transferAmount < 0 || sum(kirganUser) < transferAmount) {
    inputTransferAmount1.textContent = '-----------';
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

// Secundomer

labelTimer.style.color = 'lightslategray';

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

let index;

let newArr = Array.from(
  document.querySelectorAll('.movements__value'),
  function (val, key) {
    index = val.textContent;
    for (let i = 0; i < index.length; i++) {
      for (let j = 0; j < i; j++) {
        if ((j = '€')) {
        }
      }
    }
    return index;
  }
);

console.log(newArr);

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

// let soat = document.getElementById('soat');
// let minut = document.getElementById('minut');
// let secund = document.getElementById('secund');

function currentTime() {
  let date = new Date();

  let soat1 = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  soat.innerHTML = soat1;
  minut.innerHTML = mm;
  secund.innerHTML = ss;

  if (soat1 < 10) {
    soat1 = '0' + soat1;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  if (ss < 10) {
    ss = '0' + ss;
  }

  let time = `${soat1}:${mm}:${ss}`;

  document.getElementById('time_date').innerText = time;

  setTimeout(function () {
    currentTime();
    console.log(new Date().getTime() / 31536000);
  }, 1000);
}

// currentTime();

// /////////////////////////////////////////

// Nol (0) dan boshlab 9999 gacha istalgan butun son
// kiritilganda shu sonni string turida yozib chiqaruvchi dastur tuzing.
// misol uchun : 0 kiritlsa nol degan , 100 kiritilsa yuz degan , 211 kiritilsa ikki yuz on bir degan yozuv chiqsin
