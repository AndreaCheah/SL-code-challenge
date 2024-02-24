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
        .catch((error) =>
          console.error("Error fetching currency list:", error)
        );
  });
  0;
});
