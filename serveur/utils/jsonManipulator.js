const { randomUUID } = require("crypto");

/**
 * Fonction qui extrait et renvoie toutes les recipe du json passé en paramètre.
 * @param {json} recipesJsonDb données json à traiter.
 * @returns tableau de recipe extrait du json.
 */
module.exports.getAllRecipesFromJsonDb = (recipesJsonDb) => {
  let recipes = [];
  recipesJsonDb.recipes.forEach(function (recipeGroup) {
    const countryName = recipeGroup.gastronomy;
    const countryRecipes = recipeGroup.recipes;
    countryRecipes.forEach((r) => (r.gastronomy = countryName));
    recipes = recipes.concat(countryRecipes);
  });
  return recipes;
};

/**
 * Fonction qui extrait et renvoie les recipe du json passé en paramètre qui contiennent
 * l'ingrédient passé en paramètre.
 * @param {json} recipesJsonDb données json à traiter.
 * @param {string} ingrName nom de l'ingredient à filtrer
 * @returns
 */
module.exports.getRecipesByIngredientName = (recipesJsonDb, ingrName) => {
  const allRecipes = this.getAllRecipesFromJsonDb(recipesJsonDb);
  const recipesToReturn = allRecipes.filter((recipe) => {
    return recipe.ingredients.some(
      (ingredient) => ingredient.name === ingrName
    );
  });
  return recipesToReturn;
};

/**
 * Fonction qui extrait et renvoie les recipe du json passé en paramètre qui
 * sont dans la gastronomy passée en paramètre.
 * @param {json} recipesJsonDb données json à traiter.
 * @param {string} gastName nom de la gastronomie à filtrer
 * @returns
 */
module.exports.getRecipesByGastronomyName = (recipesJsonDb, gastName) => {
  const allRecipes = this.getAllRecipesFromJsonDb(recipesJsonDb);
  return allRecipes.filter((r) => r.gastronomy === gastName);
};

/**
 * Fonction qui ajoute dans le json recipesJsonDb la recette passée en paramètres dans
 * la gastronomy passée en paramètre.
 * Crée une gastronomy si elle n'existe pas déjà.
 * @param {json} recipesJsonDb données json à traiter.
 * @param {json} recipeToAdd recipe à ajouter.
 * @param {string} gastronomy gastronomy dans laquelle est ajoutée la recipe.
 * @returns un objet contenant le json des données mis à jour et l'id de la nouvelle recette.
 * @throws {Error} de type 400 si l'objet à ajouter est mal formé'
 */
module.exports.getNewJsonAddRecipe = (
  recipesJsonDb,
  recipeToAdd,
  gastronomy
) => {
  if (
    recipeToAdd.hasOwnProperty("title") &&
    recipeToAdd.hasOwnProperty("ingredients") &&
    recipeToAdd.ingredients.length !== 0
  ) {
    const gastronomyObj = recipesJsonDb.recipes.find(
      (obj) => obj.gastronomy === gastronomy
    );
    recipeToAdd.id = randomUUID();
    if (gastronomyObj) {
      gastronomyObj.recipes.push(recipeToAdd);
    } else {
      // Crée une nouvelle gastronomy
      const newGastronomyObj = {
        gastronomy: gastronomy,
        recipes: [recipeToAdd],
      };
      recipesJsonDb.recipes.push(newGastronomyObj);
    }
    removeGastronomyFromRecipes(recipesJsonDb);
    return { jsonData: recipesJsonDb, id: recipeToAdd.id };
  } else {
    const error = new Error("body mal formé");
    error.name = "ValidationError";
    throw error;
  }
};

/**
 * Fonction qui supprime dans le json recipesJsonDb la recette dont l'id est passé en
 * paramètre.
 * Supprime la gastronomy si elle ne contient plus de recipe.
 * @param {json} recipesJsonDb données json à traiter.
 * @param {string} id id de la recipe à supprimer.
 * @returns json des données mis à jour.
 * @throws {Error} de type 404 si l'id est incorrect
 */
module.exports.getNewJsonDeleteRecipe = (recipesJsonDb, id) => {
  for (let i = 0; i < recipesJsonDb.recipes.length; i++) {
    const gastronomyObj = recipesJsonDb.recipes[i];
    const recipes = gastronomyObj.recipes;
    const index = recipes.findIndex((r) => r.id === id);
    if (index !== -1) {
      recipes.splice(index, 1);
      if (recipes.length === 0) {
        // Supprimer la gastronomie si elle ne contient plus de recipe
        recipesJsonDb.recipes.splice(i, 1);
      }
      removeGastronomyFromRecipes(recipesJsonDb);
      return recipesJsonDb;
    } 
    else {
      const error = new Error("id not found");
      error.name = "NotFoundError";
      throw error;
    }
  }
  //return {};
};

/** TODO : Modifier si l'id n'existe renvoyer une erreur 404 */
/**
 * Fonction qui modifie dans le json recipesJsonDb la recette dont l'id est passé en
 * paramètre.
 * @param {json} recipesJsonDb données json à traiter.
 * @param {json} recipeToAdd nouvelle valeurs de la recipe à modifier.
 * @param {string} id id de la recipe à modifier.
 * @returns json des données mis à jour.
 * @throws {Error} de type 404 si l'id est incorrect ou 400 si le l'objet à traiter 
 * 'recipeToUpdate' est mal formé
 */
module.exports.getNewJsonUpdateRecipe = (recipesJsonDb, recipeToUpdate, id) => {
  if (
    recipeToUpdate.hasOwnProperty("title") &&
    recipeToUpdate.hasOwnProperty("ingredients") &&
    recipeToUpdate.ingredients.length !== 0
  ) {
    let isPresent = false;
    for (const recipes of recipesJsonDb.recipes) {
      for (const subRecipe of recipes.recipes) {
        // if
        if (subRecipe.id === id) {
          isPresent = true;
          subRecipe.title = recipeToUpdate.title;
          subRecipe.ingredients = recipeToUpdate.ingredients;
        }
      }
    }
    if (isPresent) {
      return recipesJsonDb;
    } else {
      const error = new Error("id not found");
      error.name = "NotFoundError";
      throw error;
    }
  } 
  else {
    const error = new Error("body mal formé");
    error.name = "ValidationError";
    throw error;
  }
};

/**
 * Fonction qui supprime du json à traiter la propriété 'gastronomy' avant de le renvoyer.
 * Pour ne pas modifier la structure de data.json.
 * @param {json} recipesJsonDb données json à traiter.
 * @returns json des données mis à jour.
 */
function removeGastronomyFromRecipes(recipesJsonDb) {
  for (const recipe of recipesJsonDb.recipes) {
    for (const subRecipe of recipe.recipes) {
      delete subRecipe.gastronomy;
    }
  }
  return recipesJsonDb;
}
