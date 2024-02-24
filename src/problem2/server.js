const express = require('express');
const fetch = require('node-fetch'); // Make sure to install node-fetch if not already installed
const app = express();
const PORT = 3000;

app.get('/api/currencies', async (req, res) => {
    try {
        const response = await fetch('https://interview.switcheo.com/prices.json');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching currencies:', error);
        res.status(500).send('Error fetching currency list');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
