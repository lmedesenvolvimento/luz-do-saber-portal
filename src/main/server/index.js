const express = require('express');
const nocache = require('nocache');
const Router = require('./router');
const PORT = 9000;

const boostrapAPI = () => {
    const app = express();

    app.use(nocache())
    
    Router(app);
    
    app.listen(PORT, () => {
        console.log(`API up listening on port ${PORT}!`)
    });

    return app;
}

boostrapAPI()

module.exports = boostrapAPI