document.addEventListener('DOMContentLoaded', function() {
    const currencyToggleButtons = document.querySelectorAll('.currency-toggle');

    currencyToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            fetch('https://interview.switcheo.com/prices.json')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // For example, populate a dropdown menu with these currencies
                })
                .catch(error => console.error('Error fetching currency list:', error));
        });
    });0
});
