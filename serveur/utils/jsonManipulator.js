
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