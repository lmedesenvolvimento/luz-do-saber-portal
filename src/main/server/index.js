const express = require('express');
const PORT = 9000;

const boostrapAPI = () => {
    const app = express();
    
    app.use(express.static('public'));
        
    app.listen(PORT, () => {
        console.log(`API up listening on port ${PORT}!`)
    });

    return app;
}

module.exports = boostrapAPI