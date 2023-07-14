const { randomUUID } = require("crypto");

module.exports.getAllRecipesFromJsonDb = (recipesJsonDb) => {
    let recipes = [];
    recipesJsonDb.recipes.forEach(function(recipeGroup) {
      const countryName = recipeGroup.gastronomy;
      const countryRecipes = recipeGroup.recipes;
      countryRecipes.forEach(r => r.gastronomy = countryName);
      recipes = recipes.concat(countryRecipes);
    });
    return recipes
}

module.exports.getRecipesByIngredientName = (recipesJsonDb, ingrName) => {
    console.log('appel fonction getRecipesByIngredientName')
    const allRecipes = this.getAllRecipesFromJsonDb(recipesJsonDb);
    const recipesToReturn = allRecipes.filter(recipe => {
        return recipe.ingredients.some(ingredient => ingredient.name === ingrName);
    });
    return recipesToReturn;
}

module.exports.getRecipesByGastronomyName = (recipesJsonDb, gastName) => { 
    const allRecipes = this.getAllRecipesFromJsonDb(recipesJsonDb);
    return allRecipes.filter((r) => r.gastronomy === gastName);
}

module.exports.getNewJsonAddRecipe = (recipesJsonDb, recipeToAdd, gastronomy) => {
    console.log('data json :', recipesJsonDb);
    const gastronomyObj = recipesJsonDb.recipes.find(obj => obj.gastronomy === gastronomy);
    recipeToAdd.id = randomUUID();
    if (gastronomyObj) {
        gastronomyObj.recipes.push(recipeToAdd);
      } else {
        // Si la gastronomie n'existe pas, on crée une nouvelle entrée pour cette gastronomie
        const newGastronomyObj = {
          gastronomy: gastronomy,
          recipes: [recipeToAdd]
        };
        recipesJsonDb.recipes.push(newGastronomyObj);
      }
      return { "jsonData": recipesJsonDb,  "id": recipeToAdd.id};
}