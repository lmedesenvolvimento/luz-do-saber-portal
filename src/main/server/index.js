const path = require('path');
const express = require('express');
const PORT = 9000;

const boostrapAPI = () => {
    const app = express();
    const static = express.static(path.join(__dirname, 'static'));

    app.get('/ping', (req, res) => {
        res.send('Hello Electron')
    })
    
    app.use(static);

    app.listen(PORT, () => {
        console.log(`API up listening on port ${PORT}!`)
    });

    return app;
}

module.exports = boostrapAPI