const mongoose = require('mongoose')

exports.connect = async () => {
    await mongoose.connect('mongodb://localhost:27017/recipe');
}