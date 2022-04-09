const schema = require('mongoose').Schema

exports.reccipeSchema = new schema({
    name: String,
    description: String,
    image: String,
    recipeYield: String,
    cookTime: String,
    prepTime: String,
    ingredients: Array
})