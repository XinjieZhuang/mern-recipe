const router = require('express').Router();
const { recipeModel } = require('./model/recipe');
const recipeData = require('./database/recipes.json');

router.get("/save-from-json", async (req, res, next) => {
    try {
        await recipeModel.deleteMany({})
        const insertedList = await recipeModel.insertMany(recipeData)
        res.status(200).json({
            count: insertedList.length
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
})

router.post("/create", async (req, res, next) => {
    try {
        const fields = [
            "name",
            "description",
            "ingredients"
        ]
        for (let i = 0; i < fields.length; i++) {
            if(!req.body.hasOwnProperty(fields[i])) {
                throw new Error("Please fill all fields")
            }
        }
        let recipe = await recipeModel.create(req.body);
        let recipeCount = await recipeModel.find({}).count()
        res.status(201).json({
            count: recipeCount
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

router.post("/ingredients", async (req, res, next) => {
    try {
        const ingredientpartial = req.body.ingredient;
        const data = await recipeModel.find({'ingredients': {$regex: ingredientpartial, $options: "i"}}, 'ingredients.$', {limit: 3}) 
        const ingredient = data.map(obj => {
            let str = obj.ingredients[0]
            let index = str.indexOf(ingredientpartial)
            return str.substring(index, str.length)
        });
        res.status(200).json({
            ingredient: [...new Set(ingredient)]
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = router