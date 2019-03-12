const db = require('../../database');
const { mapUnits } = require('./index')

const ThemesController = (app) => {
    app.get('/game/:module_slug/:theme_slug', ({ params }, res) => {
        let response = db.read()
            .get('modules')
            .find({ slug: params.module_slug })
            .get('themes')
            .find({ slug: params.theme_slug })
            .value();
        
        if (response) {
            response.units = response.units.map(mapUnits)
        }

        if (response) {
            res.json(response);
        } else {
            res.status(422).send({ error: true });
        }
    });
}

module.exports = ThemesController;