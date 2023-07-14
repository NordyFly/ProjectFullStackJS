const { resolve } = require('path');
const { randomUUID } = require('crypto');
// DECLARATIONS
const { recipes } = require('../db/data.json');
const { writeFileSync } = require('fs');
const { getAllRecipesFromJsonDb } = require('./../utils/jsonExtract.js');

      
function updateJSON() {
    writeFileSync(
      resolve('db', 'data.json'),
      JSON.stringify({ todos,user }, null, 2)
    );
  }
  
  exports.allRecipes = (req, res) => {
    const recipesAll = getAllRecipesFromJsonDb(recipes);
    res.json(recipesAll);
  };

  exports.filterGastronomy = (req, res) => {
    const { gastronomy } = req.query;
    const filtered = recipes.filter(recipe => recipe.gastronomy === gastronomy);
    res.json(filtered);
  };

exports.filterIngredients = (req, res) => {
  const { ingredient } = req.query;
  console.log("req.query", req.query);
  const filtered = recipes.filter(recipe => recipe.ingredients.includes(ingredient));
  console.log("filtered :", filtered);
  res.json(filtered);
};

  exports.createRecipes =  (req, res) => {
    recipes.push(req.body);
    res.json(recipes);
  };

  exports.updateRecipes = (req, res) => {
    const { id } = req.params.id;
    const updated = req.body;
    recipes = recipes.map(recipe => (recipe.id === Number(id) ? updated : recipe));
    res.json(recipes);
  };

  exports.deleteRecipes = (req, res) => {
    const { id } = req.params.id;
    recipes = recipes.filter(recipe => recipe.id !== Number(id));
    res.json(recipes);
  };

  /**
   * A ne pas utiliser : elle va casser le data.json
   */
  function updateJSON(){
    writeFileSync(
      resolve('db','data.json'),
      JSON.stringify({recipes}, null, 2)
    );
  }