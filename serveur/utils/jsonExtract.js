const { randomUUID } = require("crypto");

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

module.exports.getRecipesByIngredientName = (recipesJsonDb, ingrName) => {
  const allRecipes = this.getAllRecipesFromJsonDb(recipesJsonDb);
  const recipesToReturn = allRecipes.filter((recipe) => {
    return recipe.ingredients.some(
      (ingredient) => ingredient.name === ingrName
    );
  });
  return recipesToReturn;
};

module.exports.getRecipesByGastronomyName = (recipesJsonDb, gastName) => {
  const allRecipes = this.getAllRecipesFromJsonDb(recipesJsonDb);
  return allRecipes.filter((r) => r.gastronomy === gastName);
};

module.exports.getNewJsonAddRecipe = (
  recipesJsonDb,
  recipeToAdd,
  gastronomy
) => {
  const gastronomyObj = recipesJsonDb.recipes.find(
    (obj) => obj.gastronomy === gastronomy
  );
  recipeToAdd.id = randomUUID();
  if (gastronomyObj) {
    gastronomyObj.recipes.push(recipeToAdd);
  } else {
    // Si la gastronomie n'existe pas, on crée une nouvelle entrée pour cette gastronomie
    const newGastronomyObj = {
      gastronomy: gastronomy,
      recipes: [recipeToAdd],
    };
    recipesJsonDb.recipes.push(newGastronomyObj);
  }
  return { jsonData: recipesJsonDb, id: recipeToAdd.id };
};

module.exports.getNewJsonDeleteRecipe = (recipesJsonDb, id) => {
  for (let i = 0; i < recipesJsonDb.recipes.length; i++) {
    const gastronomyObj = recipesJsonDb.recipes[i];
    const recipes = gastronomyObj.recipes;
    const index = recipes.findIndex((r) => r.id === id);
    if (index !== -1) {
      recipes.splice(index, 1);
      if (recipes.length === 0) {
        // Supprimer la gastronomie si elle ne contient plus de recettes
        recipesJsonDb.recipes.splice(i, 1);
      }
      return recipesJsonDb;
    }
  }
  return {};
};
