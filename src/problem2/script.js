document.addEventListener("DOMContentLoaded", function () {
  const currencySelectElements = document.querySelectorAll(".currency-select");
  currencySelectElements.forEach((selectElement) => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const currencies = new Set();
        data.forEach((item) => {
          console.log(item.currency);
          if (!currencies.has(item.currency)) {
            currencies.add(item.currency);
            const option = document.createElement("option");
            option.value = item.currency;
            option.text = item.currency;
            selectElement.appendChild(option);
          }
        });
      })
      .catch((error) => console.error("Error fetching currency list:", error));
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

  const inputAmountSend = document.getElementById("send-amount");
  const inputAmountReceive = document.getElementById("receive-amount");

  inputAmountSend.addEventListener("input", function () {
    inputAmountReceive.value = inputAmountSend.value; // for now they are of the same value
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
