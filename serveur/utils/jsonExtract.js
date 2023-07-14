module.exports.getAllRecipesFromJsonDb = (recipesJsonDb) => {
    let recipes = [];
    recipesJsonDb.forEach(function(recipeGroup) {
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