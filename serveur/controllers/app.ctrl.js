const { resolve } = require("path");
const jsonData = require("./../db/data.json");
const { writeFileSync } = require("fs");
const {
  getAllRecipesFromJsonDb,
  getRecipesByIngredientName,
  getRecipesByGastronomyName,
  getNewJsonAddRecipe,
  getNewJsonDeleteRecipe,
  getNewJsonUpdateRecipe,
} = require("../utils/jsonManipulator.js");

/**
 * Fonction qui gère les requêtes get avec le paramètre 'gastronomy' ou 'ingredient'
 * ou sans paramètre.
 * Renvoie un tableau d'objets recipe ou une erreur 404.
 * @param {Request} req
 * @param {Response} res
 */
exports.getRecipesCtrl = (req, res) => {
  const recipesAll = getAllRecipesFromJsonDb(jsonData);
  const ingredient = req.query.ingredient;
  const gastronomy = req.query.gastronomy;
  try {
    if (ingredient) {
      res.json(getRecipesByIngredientName(jsonData, ingredient));
    } else if (gastronomy) {
      res.json(getRecipesByGastronomyName(jsonData, gastronomy));
    } else {
      res.json(recipesAll);
    }
  } 
  catch (e) {
    if (e.name === "JsonProblem") {
      res.status(500).json({
        code: "500",
        title: "Fichier data.json corrompu.",
      });
    } 
    else  if (e.name === "NotFoundError") {
      res.status(404).json({
        code: "404",
        title: "Ressource introuvable.",
      });
    }
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
 * Renvoie la recipe créée avec son id ou une erreur 400, 404 ou 500.
 * @param {Request} req
 * @param {Response} res
 */
exports.createRecipeCtrl = (req, res) => {
  const gastronomy = req.query.gastronomy;
  if (gastronomy) {
    try {
      const newJsonData = getNewJsonAddRecipe(jsonData, req.body, gastronomy);
      updateJSON(newJsonData.jsonData);
      const recipesAll = getAllRecipesFromJsonDb(jsonData);
      const id = newJsonData.id;
      const newRecipe = recipesAll.find((r) => r.id === id);
      res.json(newRecipe);
    } catch (e) {
      if (e.name === "ValidationError") {
        res.status(400).json({
          code: "400",
          title: "Corps de requête incorrect.",
        });
      } 
      else if (e.name === "JsonProblem") {
        res.status(400).json({
          code: "500",
          title: "Fichier data.json corrompu."
        });
      } 
      else {
        res.status(500).json({
          code: "500",
          title: "Erreur serveur.",
        });
      }
    }
  } else {
    res.status(404).json({
      code: "404",
      title: "Url incorrecte.",
    });
  }
};

/**
 * Fonction qui gère les requêtes patch de modification de recipe avec l'id en paramètre
 * dans l'url.
 * Renvoie la recipe modifiée avec son id ou une erreur 400, 404 ou 500.
 * @param {Request} req
 * @param {Response} res
 */
exports.updateRecipesCtrl = (req, res) => {
  const id = req.params.id;
  const reqBody = req.body;
  try {
    const newJsonData = getNewJsonUpdateRecipe(jsonData, reqBody, id);
    updateJSON(newJsonData);
    const recipesAll = getAllRecipesFromJsonDb(jsonData);
    const updatedRecipe = recipesAll.find((r) => r.id === id);
    res.json(updatedRecipe);
  } catch (e) {
    if (e.name === "ValidationError") {
      res.status(400).json({
        code: "400",
        title: "Corps de requête incorrect.",
      });
    } 
    else if (e.name === "NotFoundError") {
      res.status(404).json({
        code: "404",
        title: "Ressource introuvable.",
      });
    }
    else if (e.name === "JsonProblem") {
      res.status(500).json({
        code: "500",
        title: "Fichier data.json corrompu.",
      });
    } 
    else {
      res.status(500).json({
        code: "500",
        title: "Erreur serveur.",
      });
    }
  }
};

/**
 * Fonction qui gère les requêtes delete de suppression de recipe avec l'id en paramètre
 * dans l'url.
 * Renvoie un json avec l'id de la recipe supprimée en cas de succès ou une erreur 404 ou 500.
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteRecipesCtrl = (req, res) => {
  const id = req.params.id;
  try {
    jsonData.recipes = getNewJsonDeleteRecipe(jsonData, id).recipes;
    updateJSON(jsonData);
    const toReturn = {
      code: "200",
      title: "Ressource recette supprimée.",
      id: id,
    };
    res.json(toReturn);
  } catch (e) {
    if (e.name === "NotFoundError") {
      res.status(404).json({
        code: "404",
        title: "Ressource introuvable.",
      });
    } 
    else if (e.name === "JsonProblem") {
      res.status(500).json({
        code: "500",
        title: "Fichier data.json corrompu.",
      });
    }  
    else {
      res.status(500).json({
        code: "500",
        title: "Erreur serveur.",
      });
    }
  }
};

  function updateJSON(){
    writeFileSync(
      resolve('db','data.json'),
      JSON.stringify({recipes}, null, 2)
    );
  }