const { resolve } = require("path");
// DECLARATIONS
const jsonData = require("./../db/data.json");
const { writeFileSync } = require("fs");
const {
  getAllRecipesFromJsonDb,
  getRecipesByIngredientName,
  getRecipesByGastronomyName,
  getNewJsonAddRecipe,
  getNewJsonDeleteRecipe
} = require("./../utils/jsonExtract.js");

//console.log("datas json :", jsonData);

exports.recipesCtrl = (req, res) => {
  const recipesAll = getAllRecipesFromJsonDb(jsonData);
  const ingredient = req.query.ingredient;
  const gastronomy = req.query.gastronomy;
  if (ingredient) {
    res.json(getRecipesByIngredientName(jsonData, ingredient));
  } else if (gastronomy) {
    res.json(getRecipesByGastronomyName(jsonData, gastronomy));
  } else {
    res.json(recipesAll);
  }
};

/** Ne sert pas, ne prend pas en compte le parametre 'ingredient' de l'url  
  exports.filterGastronomy = (req, res) => {
    const { gastronomy } = req.query;
    const filtered = recipes.filter(recipe => recipe.gastronomy === gastronomy);
    res.json(filtered);
  };
  */

/** Ne sert pas, ne prend pas en compte le parametre 'ingredient' de l'url  
exports.filterIngredients = (req, res) => {
  
  const { ingredient } = req.query;
  console.log("req.query", req.query);
  const filtered = recipes.filter(recipe => recipe.ingredients.includes(ingredient));
  console.log("filtered :", filtered);
  res.json(filtered);

};*/

exports.createRecipeCtrl = (req, res) => {
  /* ne marche pas
  recipes.push(req.body);
  res.json(recipes);
  */
  const gastronomy = req.query.gastronomy;
  if(gastronomy) {
    const newJsonData = getNewJsonAddRecipe(jsonData, req.body, gastronomy);
    //jsonData.recipes = newJsonData.jsonData.recipes;
    updateJSON(newJsonData.jsonData);
    const recipesAll = getAllRecipesFromJsonDb(jsonData);
    const id = newJsonData.id;
    const newRecipe = recipesAll.find(r => r.id === id);
    console.log('new recipe :', newRecipe);
    res.json(newRecipe);
  }
  else {
    res.end();
  }
  
}

exports.updateRecipes = (req, res) => {
  const { id } = req.params.id;
  const updated = req.body;
  jsonData = jsonData.map((recipe) =>
    recipe.id === Number(id) ? updated : recipe
  );
  res.json(recipes);
}

exports.deleteRecipesCtrl = (req, res) => {
  // ne marche pas
  //jsonData.recipes = jsonData.recipes.filter((r) => r.id !== id);
  const id = req.params.id;
  jsonData.recipes = getNewJsonDeleteRecipe(jsonData, id).recipes;
  updateJSON(jsonData);
  res.json(id);
}



/**
 * Attention :A ne pas utiliser sans précaution : 
 * elle peut casser le data.json !!!!!!!!!!!!!!!!!!!!!!!!!
 */

function updateJSON(newJsonData) {
  writeFileSync(
    resolve('db','data.json'),
    JSON.stringify(newJsonData, null, 2)
  );
}
