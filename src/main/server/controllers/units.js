const db = require('../../database');

const UnitsController = (app) => {
    app.get('/game/:module_slug/:theme_slug/:unity_slug', ({ params }, res) => {
        let response = db.read()
            .get('modules')
            .find({ slug: params.module_slug })
            .get('themes')
            .find({ slug: params.theme_slug })
            .get('units')
            .find({ slug: params.unity_slug })
            .value();

        if (response) {
            res.status(200).json(response);
        } else {
            res.status(422).send({ error: true });
        }
    });
}

module.exports = UnitsController;