function getAllRecipesFromJsonDb(recipesJsonDb) {
    let recipes = [];
    recipesJsonDb.forEach(function(recipeGroup) {
      const countryName = recipeGroup.name;
      const countryRecipes = recipeGroup.recipes;
      countryRecipes.forEach(r => r.gastronomy = countryName);
      recipes = recipes.concat(countryRecipes);
    });
    return recipes
}

module.exports.getAllRecipesFromJsonDb = getAllRecipesFromJsonDb;