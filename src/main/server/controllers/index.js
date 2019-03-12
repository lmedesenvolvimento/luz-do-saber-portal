const { omit } = require('lodash');

const mapModules = (model) => {
    return omit(model, 'themes');
}

const mapThemes = (theme) => {
    return omit(theme, 'units');
}

const mapUnits = (unity) => {
    return omit(unity, 'questions');
}

module.exports = { mapModules, mapThemes, mapUnits };