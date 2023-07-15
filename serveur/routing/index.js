const router = require('express').Router();
const {
  recipesCtrl,
  createRecipeCtrl,
  updateRecipesCtrl,
  deleteRecipesCtrl,
} = require('../controllers/app.ctrl');



// Récupérer toutes les recettes / Attention : les parametre apres '?' sont pris en compte dans cette route
router.get('/recipes', recipesCtrl);

// ci dessous : ne sert pas, ne prend pas en compte le parametre apres le ? de l'url de la requete
// Filtrer les recettes par gastronomie et ingrédients
//router.get('/recipes/gastronomy', filterGastronomy);

// ci dessous : ne sert pas, ne prend pas en compte le parametre apres le ? de l'url de la requete
//router.get('/recipes/ingredients', filterIngredients);

// Créer une nouvelle recette
router.post('/recipes', createRecipeCtrl);
// Modifier une recette existante
router.patch('/recipes/:id', updateRecipesCtrl);
// Supprimer une recette
router.delete('/recipes/:id', deleteRecipesCtrl);

router.get('*', (req, res) => res.redirect('/recipes'));
module.exports = router;