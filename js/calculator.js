"use strict";

// getting elements
// radios
const radioInputs = document.querySelectorAll(".measure-radio");
const radioProducts = [...document.querySelectorAll(".product-radio")];

// inputs
const amounts = [...document.getElementsByClassName("amount")];
const measureInput = document.getElementById("measure-input");
const measureLabel = document.getElementsByClassName("measure-label")[0];

//btns
const btnCalc = document.querySelector(".btn-calculate");
const btnReset = document.querySelector(".btn-reset");

// table header product name
const showProductName = document.querySelectorAll(".product-variant");

// getting the default values for 1 gallon
const initAmount = amounts.map(function (el) {
  return el.innerText;
});

// helper function
function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

// radio click handler
const radioEventHandler = function (e) {
  measureLabel.innerText = e.target.value;
  calc();
};

// calculator func
const calc = function () {
  // getting amount from the input
  let amount = measureInput.value;
  // getting measurement system
  let measureLabelVal = measureLabel.innerText;
  if (amount < 0) {
    amount = 1;
    measureInput.value = 1;
  }
  amounts.forEach(function (el, i) {
    // for tsp
    if (initAmount[i] == "1/2") {
      let result =
        measureLabelVal === "Liters" ? (0.5 * amount) / 3.785 : 0.5 * amount;

      // check for 0.5
      if (result === 0.5) {
        el.innerText = "1/2";
        return;
      }

      el.innerText = isFloat(result) ? parseFloat(result.toFixed(2)) : result;
      return;
    }
    // calculating the value based on selected measured system
    let calcedVal =
      measureLabelVal === "Liters"
        ? (initAmount[i] * amount) / 3.785
        : initAmount[i] * amount;
    el.innerText = isFloat(calcedVal)
      ? parseFloat(calcedVal.toFixed(2))
      : calcedVal;
  });
};

const changeProduct = function (e) {
  showProductName.forEach(function (el, i) {
    if (e.target.value === "Bon Vivant" && i === 0) {
      el.innerText = `${e.target.value} Grow`;
    }
    if (e.target.value === "Bon Vivant" && i === 1) {
      el.innerText = `${e.target.value} Bloom`;
    }
    if (e.target.value === "Shanti A&B") {
      el.innerText = e.target.value;
    }
  });
};

// reset function
const reset = function () {
  radioInputs[1].checked = true;
  radioProducts[0].checked = true;
  showProductName.forEach(function (el, i) {
    if (i === 0) {
      el.innerText = "Bon Vivant Grow";
    } else {
      el.innerText = "Bon Vivant Bloom";
    }
  });
  amounts.forEach(function (el, i) {
    el.innerText = initAmount[i];
  });
};

// event listeners
radioInputs.forEach(function (el) {
  el.addEventListener("click", radioEventHandler);
});

radioProducts.forEach(function (el) {
  el.addEventListener("click", changeProduct);
});

measureInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") calc();
});

btnCalc.addEventListener("click", calc);
btnReset.addEventListener("click", reset);

// first initialization
window.onload = function () {
  radioInputs[1].checked = true;
  radioProducts[0].checked = true;
};
