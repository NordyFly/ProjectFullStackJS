const router = require('express').Router();
const {
  getRecipesCtrl,
  createRecipeCtrl,
  updateRecipesCtrl,
  deleteRecipesCtrl,
} = require('../controllers/app.ctrl');

// Récupérer toutes les recettes / Attention : les parametre apres '?' sont pris en compte dans cette route
router.get('/recipes', getRecipesCtrl);
// Créer une nouvelle recette
router.post('/recipes', createRecipeCtrl);
// Modifier une recette existante selon son id
router.patch('/recipes/:id', updateRecipesCtrl);
// Supprimer une recette selon son id
router.delete('/recipes/:id', deleteRecipesCtrl);
// Renvoyer vers la page par défaut pour tous les autres cas
router.get('*', (req, res) => res.redirect('/recipes'));
module.exports = router;