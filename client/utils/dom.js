  /**
   * Crée un élément du dom, lui ajoute du texte, le place comme dernier
   * enfant de parent et ajoute un attribut en utilisant le paramètre attributes
   * @param {String} markup_name 
   * @param {String} text 
   * @param {domElement} parent 
   * @param {Array[Object]} attributes  (doit comprendre les propriétés name et value)
   * @returns domElement
   */
  /**
   * Crée un élément du dom, lui ajoute du texte, le place comme dernier
   * enfant de parent et ajoute un attribut en utilisant le paramètre attributes
   * @param {String} markup_name 
   * @param {String} text 
   * @param {domElement} parent 
   * @param {Array[Object]} attributes  (doit comprendre les propriétés name et value)
   * @returns domElement
   */
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
  const container = document.createElement('div');
  container.classList.add('container');

  // Titre de l'application
  createMarkup('h1', 'Master Cook', container, [{ name: 'class', value: 'text-center mt-5' }]);

  const row = createMarkup('div', '', container, [{ name: 'class', value: 'row mt-4' }]);

  // Bouton "Afficher toutes les recettes"
  createMarkup('div', '', createMarkup('div', '', row, [{ name: 'class', value: 'col-md-3' }]), [{ name: 'class', value: 'col-md-3' }]);
  createMarkup('button', 'Afficher toutes les recettes', row.lastChild.firstChild, [{ name: 'id', value: 'showAllRecipesBtn' }, { name: 'class', value: 'btn btn-primary btn-block' }]);

  // Bouton "Sélection par pays"
  createMarkup('div', '', createMarkup('div', '', row, [{ name: 'class', value: 'col-md-3' }]), [{ name: 'class', value: 'col-md-3' }]);
  createMarkup('button', 'Sélection par pays', row.lastChild.firstChild, [{ name: 'id', value: 'filterByCountryBtn' }, { name: 'class', value: 'btn btn-primary btn-block' }]);

  // Bouton "Sélection par ingrédient"
  createMarkup('div', '', createMarkup('div', '', row, [{ name: 'class', value: 'col-md-3' }]), [{ name: 'class', value: 'col-md-3' }]);
  createMarkup('button', 'Sélection par ingrédient', row.lastChild.firstChild, [{ name: 'id', value: 'filterByIngredientBtn' }, { name: 'class', value: 'btn btn-primary btn-block' }]);

  // Bouton "Nouvelle recette" (avec modal)
  createMarkup('div', '', createMarkup('div', '', row, [{ name: 'class', value: 'col-md-3' }]), [{ name: 'class', value: 'col-md-3' }]);
  const addRecipeBtn = createMarkup('button', 'Nouvelle recette', row.lastChild.firstChild, [{ name: 'id', value: 'addRecipeBtn' }, { name: 'class', value: 'btn btn-primary btn-block', 'data-toggle': 'modal', 'data-target': '#addRecipeModal' }]);

  // Modal pour afficher une recette
  const recipeModal = createMarkup('div', '', document.body, [{ name: 'class', value: 'modal fade', 'id': 'recipeModal', 'tabindex': '-1', 'role': 'dialog', 'aria-labelledby': 'recipeModalLabel', 'aria-hidden': 'true' }]);
  const modalDialog = createMarkup('div', '', recipeModal, [{ name: 'class', value: 'modal-dialog', 'role': 'document' }]);
  const modalContent = createMarkup('div', '', modalDialog, [{ name: 'class', value: 'modal-content' }]);
  const modalHeader = createMarkup('div', '', modalContent, [{ name: 'class', value: 'modal-header' }]);
  createMarkup('h5', 'Titre de la recette', modalHeader, [{ name: 'class', value: 'modal-title', 'id': 'recipeModalLabel' }]);
  const closeButton = createMarkup('button', '', modalHeader, [{ name: 'type', value: 'button' }, { name: 'class', value: 'close', 'data-dismiss': 'modal', 'aria-label': 'Fermer' }]);
  createMarkup('span', '&times;', closeButton, [{ name: 'aria-hidden', value: 'true' }]);
  const modalBody = createMarkup('div', '', modalContent, [{ name: 'class', value: 'modal-body' }]);
  createMarkup('p', 'Description de la recette', modalBody);
  createMarkup('h6', 'Ingrédients :', modalBody);
  createMarkup('ul', '', modalBody, [{ name: 'id', value: 'ingredientsList' }]);
  const modalFooter = createMarkup('div', '', modalContent, [{ name: 'class', value: 'modal-footer' }]);
  createMarkup('button', 'Fermer', modalFooter, [{ name: 'type', value: 'button' }, { name: 'class', value: 'btn btn-secondary', 'data-dismiss': 'modal' }]);
  createMarkup('button', 'Modifier', modalFooter, [{ name: 'type', value: 'button' }, { name: 'class', value: 'btn btn-primary' }]);
  createMarkup('button', 'Supprimer', modalFooter, [{ name: 'type', value: 'button' }, { name: 'class', value: 'btn btn-danger' }]);

  // Modal pour ajouter une recette
  const addRecipeModal = createMarkup('div', '', document.body, [{ name: 'class', value: 'modal fade', 'id': 'addRecipeModal', 'tabindex': '-1', 'role': 'dialog', 'aria-labelledby': 'addRecipeModalLabel', 'aria-hidden': 'true' }]);
  const addModalDialog = createMarkup('div', '', addRecipeModal, [{ name: 'class', value: 'modal-dialog', 'role': 'document' }]);
  const addModalContent = createMarkup('div', '', addModalDialog, [{ name: 'class', value: 'modal-content' }]);
  const addModalHeader = createMarkup('div', '', addModalContent, [{ name: 'class', value: 'modal-header' }]);
  createMarkup('h5', 'Nouvelle recette', addModalHeader, [{ name: 'class', value: 'modal-title', 'id': 'addRecipeModalLabel' }]);
  const addCloseButton = createMarkup('button', '', addModalHeader, [{ name: 'type', value: 'button' }, { name: 'class', value: 'close', 'data-dismiss': 'modal', 'aria-label': 'Fermer' }]);
  createMarkup('span', '&times;', addCloseButton, [{ name: 'aria-hidden', value: 'true' }]);
  const addModalBody = createMarkup('div', '', addModalContent, [{ name: 'class', value: 'modal-body' }]);
  const addRecipeForm = createMarkup('form', '', addModalBody, [{ name: 'id', value: 'addRecipeForm' }]);
  createMarkup('div', '', addRecipeForm, [{ name: 'class', value: 'form-group' }]);
  createMarkup('label', 'Titre de la recette', addRecipeForm, [{ name: 'for', value: 'recipeTitle' }]);
  createMarkup('input', '', addRecipeForm, [{ name: 'type', value: 'text' }, { name: 'class', value: 'form-control', 'id': 'recipeTitle', 'required': 'required' }]);
  createMarkup('div', '', addRecipeForm, [{ name: 'class', value: 'form-group' }]);
  createMarkup('label', 'Description de la recette', addRecipeForm, [{ name: 'for', value: 'recipeDescription' }]);
  createMarkup('textarea', '', addRecipeForm, [{ name: 'class', value: 'form-control', 'id': 'recipeDescription', 'rows': '3', 'required': 'required' }]);
  createMarkup('div', '', addRecipeForm, [{ name: 'class', value: 'form-group' }]);
  createMarkup('label', 'Ingrédients', addRecipeForm, [{ name: 'for', value: 'ingredients' }]);
  createMarkup('textarea', '', addRecipeForm, [{ name: 'class', value: 'form-control', 'id': 'ingredients', 'rows': '3', 'required': 'required' }]);
  createMarkup('small', 'Saisissez les ingrédients, un par ligne.', addRecipeForm, [{ name: 'class', value: 'form-text text-muted' }]);
  const addModalFooter = createMarkup('div', '', addModalContent, [{ name: 'class', value: 'modal-footer' }]);
  createMarkup('button', 'Fermer', addModalFooter, [{ name: 'type', value: 'button' }, { name: 'class', value: 'btn btn-secondary', 'data-dismiss': 'modal' }]);
  createMarkup('button', 'Valider', addModalFooter, [{ name: 'type', value: 'button' }, { name: 'class', value: 'btn btn-primary' }]);

  // Ajout du container à la page
  document.body.appendChild(container);
}

// Appel de la fonction pour créer l'interface
createInterface();

