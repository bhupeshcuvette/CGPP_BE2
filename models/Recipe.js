const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipeName: String,
    recipeTime:String,
    ingredients: Array,
    serves:String 
});

module.exports = mongoose.model('Recipe', RecipeSchema);