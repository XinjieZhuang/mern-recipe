const model = require('mongoose').model;
const { reccipeSchema } = require('../database/schema');

exports.recipeModel = model('Recipe', reccipeSchema);