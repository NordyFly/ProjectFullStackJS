import { createMarkup } from "../utils/dom.js";
/** 
 * Construction des container 
*/
const container = createMarkup('div', '', document.body, [{ class: "container" }]);
const sctnTitle = createMarkup('section', '', container, [{ class: "row" }]);
const sctnSelect = createMarkup('section', '', container, [{ class: "d-flex flex-row justify-content-around my-5" }]);
const sctnRecipes = createMarkup('section', '', container, [{ class: "row" }]);

/**
 * Insertion du Titre
 */
const Title = createMarkup('h1', 'Master Cook', sctnTitle, [{ class: "text-center" }]);
/**
 * creation select show Recipes
 */
const divContentsctnSelectShowRecipes = createMarkup('div', '', sctnSelect, [{ class: "d-flex justify-content-center flex-column" }]);
const labelShowRecipes = createMarkup('label', 'Choisir une recette', divContentsctnSelectShowRecipes, [{ class: "form-control" }]);
const selectShowRecipes = createMarkup('select', 'Choisir une recette', divContentsctnSelectShowRecipes, [{ class: "form-select" }]);
/**
 * creation select show per country
 */
const divContentsctnSelectPerCountry = createMarkup('div', '', sctnSelect, [{ class: "d-flex justify-content-center flex-column" }]);
const labelPerCountry = createMarkup('label', 'Selectionner un pays', divContentsctnSelectPerCountry, [{ class: "form-control" }]);
const selectPerCountry = createMarkup('select', 'Selectionner un pays', divContentsctnSelectPerCountry, [{ class: "form-select" }]);
/**
 * creation select show per ingredient
 */
const divContentsctnSelectPerIngredient = createMarkup('div', '', sctnSelect, [{ class: "d-flex justify-content-center flex-column" }]);
const labelPerIngredient = createMarkup('label', 'Selectionner un Ingredient', divContentsctnSelectPerIngredient, [{ class: "form-control" }]);
const selectPerIngrendient = createMarkup('select', 'Selectionner un Ingredient', divContentsctnSelectPerIngredient, [{ class: "form-select" }]);
/**
 * creation button creation recette et listener sur le bouton
 */
const divContentsctnBtnCreationRecipes = createMarkup('div', '', sctnSelect, [{ class: "d-flex justify-content-center flex-column" }]);
const btnCreateRecipes = createMarkup('button', 'Créé une recette', divContentsctnBtnCreationRecipes, [{ class: "btn btn-success", id: "btnCreateRecipes" }]);
document.getElementById('btnCreateRecipes').addEventListener('click', showModalCreateRecipes);


/**
 * Function déclencher par le listener sur le button creation recette
 */
function showModalCreateRecipes() {
    
    const modal = document.getElementById('myModal');
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    // Masquer la modale
    bootstrapModal.hide();

}

/**
 * listener sur le button ajout d'ingredient de la modal creation de recette
 */
document.getElementById('btn-add-ingredient').addEventListener('click', addInputIngredient);

/**
 * Function déclencher par le listener sur le button ajout d'ingredient
 */
 function addInputIngredient() {
    const divCreateRecipesModal = document.getElementById('bloc-ingredient');
    const divCreateRecipesModalInput = createMarkup('div','',divCreateRecipesModal,[{class:"d-flex flex-row"}])
    createMarkup('input','',divCreateRecipesModalInput,[{class:"form-control my-1 mx-1"}]);
    createMarkup('select','',divCreateRecipesModalInput,[{class:"form-select my-1 mx-1"}]);
    createMarkup('select','',divCreateRecipesModalInput,[{class:"form-select my-1 mx-1"}]);
}