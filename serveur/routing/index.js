const router = require('express').Router();
const {
  recipesCtrl,
  createRecipeCtrl,
  updateRecipesCtrl,
  deleteRecipesCtrl,
} = require('../controllers/app.ctrl');

// Récupérer toutes les recettes / Attention : les parametre apres '?' sont pris en compte dans cette route
router.get('/recipes', recipesCtrl);
// Créer une nouvelle recette
router.post('/recipes', createRecipeCtrl);
// Modifier une recette existante
router.patch('/recipes/:id', updateRecipesCtrl);
// Supprimer une recette
router.delete('/recipes/:id', deleteRecipesCtrl);

router.get('*', (req, res) => res.redirect('/recipes'));
module.exports = router;