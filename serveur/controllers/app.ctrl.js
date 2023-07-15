const { resolve } = require("path");
const jsonData = require("./../db/data.json");
const { writeFileSync } = require("fs");
const {
  getAllRecipesFromJsonDb,
  getRecipesByIngredientName,
  getRecipesByGastronomyName,
  getNewJsonAddRecipe,
  getNewJsonDeleteRecipe,
  getNewJsonUpdateRecipe
} = require("../utils/jsonManipulator.js");


/**
 * TODO : mettre en place la gestion des erreurs !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */


/**
 * Fonction qui gère les requêtes get avec le paramètre 'gastronomy' ou 'ingredient'
 * ou sans paramètre.
 * Renvoie un tableau d'objets recipe.
 * @param {Request} req 
 * @param {Response} res 
 */
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

/**
 * Fonction qui gère les requêtes post de création de recipe avec le paramètre 'gastronomy'
 * dans l'url pour choisir à quelle gastronomy elle correspond.
 * Renvoie la recipe créée avec son id
 * @param {Request} req 
 * @param {Response} res 
 */
exports.createRecipeCtrl = (req, res) => {
  const gastronomy = req.query.gastronomy;
  if (gastronomy) {
    const newJsonData = getNewJsonAddRecipe(jsonData, req.body, gastronomy);
    updateJSON(newJsonData.jsonData);
    const recipesAll = getAllRecipesFromJsonDb(jsonData);
    const id = newJsonData.id;
    const newRecipe = recipesAll.find((r) => r.id === id);
    res.json(newRecipe);
  } else {
    res.end();
  }
};

/**
 * Fonction qui gère les requêtes patch de modification de recipe avec l'id en paramètre 
 * dans l'url.
 * Renvoie la recipe modifiée avec son id
 * @param {Request} req 
 * @param {Response} res 
 */
exports.updateRecipesCtrl = (req, res) => {
  const id = req.params.id;
  const reqBody = req.body;
  const newJsonData = getNewJsonUpdateRecipe(jsonData, reqBody, id);
  updateJSON(newJsonData);
  const recipesAll = getAllRecipesFromJsonDb(jsonData);
  const updatedRecipe = recipesAll.find((r) => r.id === id);
  res.json(updatedRecipe);
};

/**
 * Fonction qui gère les requêtes delete de suppression de recipe avec l'id en paramètre 
 * dans l'url.
 * Renvoie un json avec l'id de la recipe supprimée en cas de succès.
 * @param {Request} req 
 * @param {Response} res 
 */
exports.deleteRecipesCtrl = (req, res) => {
  const id = req.params.id;
  jsonData.recipes = getNewJsonDeleteRecipe(jsonData, id).recipes;
  updateJSON(jsonData);
  const toReturn = {
    code: "200",
    title: "Ressource recette supprimée.",
    id: id,
  };
  res.json(toReturn);
};

/**
 * Attention :A ne pas utiliser sans précaution :
 * elle peut casser le data.json !!!!!!!!!!!!!!!!!!!!!!!!!
 */

/**
 * Fonction qui met à jour le fichier data.json avec son nouveau contenu passé en paramètre.
 * @param {json} newJsonData : nouveau contenu en json.
 */
function updateJSON(newJsonData) {
  writeFileSync(
    resolve("db", "data.json"),
    JSON.stringify(newJsonData, null, 2)
  );
}
