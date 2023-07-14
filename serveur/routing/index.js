const router = require('express').Router();
const {
  allRecipes,
  filterGastronomy,
  filterIngredients,
  createRecipes,
  updateRecipes,
  deleteRecipes,
} = require('../controllers/app.ctrl');



// Récupérer toutes les recettes
router.get('/recipes', allRecipes);
// Filtrer les recettes par gastronomie et ingrédients
router.get('/recipes/gastronomy', filterGastronomy);
router.get('/recipes/ingredients', filterIngredients);
// Créer une nouvelle recette
router.post('/recipes', createRecipes);
// Modifier une recette existante
router.put('/recipes/:id', updateRecipes);
// Supprimer une recette
router.delete('/recipes/:id', deleteRecipes);

router.get('*', (req, res) => res.redirect('/recipes'));
module.exports = router;