document.addEventListener("DOMContentLoaded", function () {
  const currencySelectElements = document.querySelectorAll(".currency-select");
  const inputAmountSend = document.getElementById("send-amount");
  const inputAmountReceive = document.getElementById("receive-amount");
  let currencyPrices = {};

  fetch("https://interview.switcheo.com/prices.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("data is", data);
      const currencies = new Set();
      data.forEach((item) => {
        console.log(item.currency);
        currencyPrices[item.currency] = item.price;
        if (!currencies.has(item.currency)) {
          currencies.add(item.currency);
          currencySelectElements.forEach((selectElement) => {
            const option = document.createElement("option");
            option.value = item.currency;
            option.text = item.currency;
            selectElement.appendChild(option);
          });
        }
      });
      console.log(currencyPrices);
    })
    .catch((error) => console.error("Error fetching currency list:", error));

  function calculateReceiveAmount() {
    console.log("currency select elements are", currencySelectElements);
    const sendAmount = inputAmountSend.value;
    const sendCurrency = currencySelectElements[0].value;
    const receiveCurrency = currencySelectElements[1].value;
    const sendPrice = currencyPrices[sendCurrency];
    const receivePrice = currencyPrices[receiveCurrency];
    const receiveAmount = (sendAmount * sendPrice) / receivePrice;
    inputAmountReceive.value = receiveAmount.toFixed(2);
    if (sendAmount === '') {
      inputAmountReceive.value = '0';
    }
    console.log(
      "sendAmount, sendCurrency, sendPrice",
      sendAmount,
      sendCurrency,
      sendPrice
    );
    console.log("receiveCurrency, receivePrice", receiveCurrency, receivePrice);
  }

  inputAmountSend.addEventListener("input", calculateReceiveAmount);
  currencySelectElements.forEach((selectElement) => {
    selectElement.addEventListener("change", calculateReceiveAmount);
  });

  document.querySelectorAll("input").forEach(function (input) {
    input.addEventListener("keypress", function (e) {
      var allowedChars = "0123456789.";
      function contains(stringValue, charValue) {
        return stringValue.indexOf(charValue) > -1;
      }
      var invalidKey =
        (e.key.length === 1 && !contains(allowedChars, e.key)) ||
        (e.key === "." && contains(e.target.value, "."));
      invalidKey && e.preventDefault();
    });
  });

  // window.submitForm = function() {
  //   event.preventDefault();

  //   const form = document.querySelector('form');
  //   form.innerHTML = '<h1>Swap Successful</h1>';

  //   // Return false to prevent the form submission if not already prevented
  //   return false;
  // };
  0;
});
