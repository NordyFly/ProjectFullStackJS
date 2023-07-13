// Fonction pour créer un élément du DOM avec du texte et des attributs
function createMarkup(markupname, text, parent, attributes = []) {
  const markup = document.createElement(markupname);
  markup.textContent = text;
  parent.appendChild(markup);
  for (const attribute of attributes) {
    for (let key in attribute) {
      markup.setAttribute(key, attribute[key]);
    }
  }
  return markup;
}

// Fonction pour créer l'interface de l'application
function createInterface() {
  const container = createMarkup('div', '', document.body, [{ name: 'class', value: 'container py-5' }]);

  // Titre de l'application
  createMarkup('h1', 'Master Cook', container, [{ name: 'class', value: 'text-center mb-4' }]);

  // Bouton "Afficher toutes les recettes"
  const showAllRecipesBtn = createMarkup('button', 'Afficher toutes les recettes', container, [{ name: 'class', value: 'btn btn-primary mb-3' }]);
  showAllRecipesBtn.addEventListener('click', function() {
    // Logique pour afficher toutes les recettes
    // Ici, vous pouvez mettre le code qui affiche toutes les recettes dans la modale ou effectue une action appropriée
    console.log('Afficher toutes les recettes');
  });

  // Bouton "Sélection par pays"
  const filterByCountryBtn = createMarkup('button', 'Sélection par pays', container, [{ name: 'class', value: 'btn btn-primary mb-3' }]);
  filterByCountryBtn.addEventListener('click', function() {
    // Logique pour la sélection par pays
    // Ici, vous pouvez mettre le code qui affiche les recettes filtrées par pays dans la modale ou effectue une action appropriée
    console.log('Sélection par pays');
  });

  // Bouton "Sélection par ingrédient"
  const filterByIngredientBtn = createMarkup('button', 'Sélection par ingrédient', container, [{ name: 'class', value: 'btn btn-primary mb-3' }]);
  filterByIngredientBtn.addEventListener('click', function() {
    // Logique pour la sélection par ingrédient
    // Ici, vous pouvez mettre le code qui affiche les recettes filtrées par ingrédient dans la modale ou effectue une action appropriée
    console.log('Sélection par ingrédient');
  });

  // Bouton "Nouvelle recette" (avec modal)
  const addRecipeBtn = createMarkup('button', 'Nouvelle recette', container, [{ name: 'class', value: 'btn btn-primary mb-3', 'data-toggle': 'modal', 'data-target': '#addRecipeModal' }]);
  addRecipeBtn.addEventListener('click', function() {
    // Logique pour afficher la modale d'ajout de recette
    // Ici, vous pouvez mettre le code qui effectue l'affichage de la modale ou effectue une action appropriée
    console.log('Nouvelle recette');
  });

  // Modal pour afficher une recette
  const recipeModal = createMarkup('div', '', document.body, [{ name: 'class', value: 'modal fade', 'id': 'recipeModal', 'tabindex': '-1', 'role': 'dialog', 'aria-labelledby': 'recipeModalLabel', 'aria-hidden': 'true' }]);
  // ...

  // Modal pour ajouter une recette
  const addRecipeModal = createMarkup('div', '', document.body, [{ name: 'class', value: 'modal fade', 'id': 'addRecipeModal', 'tabindex': '-1', 'role': 'dialog', 'aria-labelledby': 'addRecipeModalLabel', 'aria-hidden': 'true' }]);
  // ...
}

// Appel de la fonction pour créer l'interface
createInterface();
