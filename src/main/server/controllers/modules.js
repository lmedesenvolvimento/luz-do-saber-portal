const db = require('../../database');

const { mapModules, mapThemes } = require('./index')

const ModulesController = (app) => {
    app.get('/game', (req, res) => {
        let response = db.read()
            .get('modules')
            .map(mapModules)
            .value();
            
        res.send(response);
    });

    app.get('/game/:module_slug', ({ params }, res) => {
        let response = db.get('modules').find({ slug: params.module_slug }).value();
        
        if (response) {
            response.themes = response.themes.map(mapThemes)
        }
        
        if (response) {
            res.json(response);
        } else {            
            res.status(422).json({ error: true });
        }
    });    
}

module.exports = ModulesController