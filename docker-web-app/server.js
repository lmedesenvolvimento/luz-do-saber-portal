'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('*', (req, res) => {
    res.redirect('/')
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);