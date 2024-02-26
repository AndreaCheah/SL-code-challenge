document.addEventListener("DOMContentLoaded", function () {
  const currencySelectElements = document.querySelectorAll(".currency-select");
  const inputAmountSend = document.getElementById("send-amount");
  const inputAmountReceive = document.getElementById("receive-amount");
  let currencyPrices = {};
  // track which input is triggering the update to prevent infinite loop
  let fromSend = true; // true if inputAmountSend is being changed, false if inputAmountReceive is being changed

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
      console.log(currencies);
      console.log("currencies length is", currencies.size);
      // set default currency selections
      if (currencies.size >= 2) {
        console.log("setting default currency selections")
        const firstCurrency = Array.from(currencies)[0];
        const secondCurrency = Array.from(currencies)[1];
        currencySelectElements[0].value = firstCurrency;
        currencySelectElements[1].value = secondCurrency;
        updateAmounts();
      }
    })
    .catch((error) => console.error("Error fetching currency list:", error));

  function updateAmounts() {
    console.log("currency select elements are", currencySelectElements);
    const sendCurrency = currencySelectElements[0].value;
    const receiveCurrency = currencySelectElements[1].value;
    const sendPrice = currencyPrices[sendCurrency];
    const receivePrice = currencyPrices[receiveCurrency];

    if (fromSend) {
      const sendAmount = inputAmountSend.value;
      const receiveAmount = (sendAmount * sendPrice) / receivePrice;
      inputAmountReceive.value = sendAmount ? receiveAmount.toFixed(2) : "0";
    } else {
      const receiveAmount = inputAmountReceive.value;
      const sendAmount = (receiveAmount * receivePrice) / sendPrice;
      inputAmountSend.value = receiveAmount ? sendAmount.toFixed(2) : "0";
    }
  }

  inputAmountSend.addEventListener("input", () => {
    fromSend = true;
    updateAmounts();
  });

  inputAmountReceive.addEventListener("input", () => {
    fromSend = false;
    updateAmounts();
  });

  currencySelectElements.forEach((selectElement) => {
    selectElement.addEventListener("change", updateAmounts);
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

  window.submitForm = function(event) {
    // event.preventDefault(); // Prevent the form from submitting in the traditional way

    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'block';
  
    // simulate server loading with a delay of 2 seconds
    setTimeout(() => {
      // hide the loading animation and redirect to the "Swap Successful" page
      loadingAnimation.style.display = 'none';
      window.location.href = 'swap-successful.html';
    }, 2000);
  
    return false;
  };
  
  0;
});
