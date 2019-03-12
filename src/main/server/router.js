const express = require('express');
const ModulesController = require('./controllers/modules');
const ThemesController = require('./controllers/themes');
const UnitsController = require('./controllers/units');

const Router = (app) => {
    const router = express.Router();

    ModulesController(router);
    ThemesController(router);
    UnitsController(router);

    app.use('/api', router);
};

module.exports = Router;