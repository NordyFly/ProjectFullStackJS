import { createMarkup } from "../utils/dom.js";

//const url = "/recipes"
const endPoint = "https://localhost:4443"
let arrayDataRecipes = [];

/** 
 * Construction des container 
*/
const container = createMarkup('div', '', document.body, [{ class: "container" }]);
const sctnTitle = createMarkup('section', '', container, [{ class: "row" }]);
const sctnSelect = createMarkup('section', '', container, [{ class: "d-flex flex-row justify-content-around my-5" }]);
const sctnRecipes = createMarkup('section', '', container, [{ class: "row", id: 'section-card-recipes' }]);
const recipeCardsContainer = document.getElementById('section-card-recipes'); // Élément parent statique

/**
 * Insertion du Titre
 */
const Title = createMarkup('h1', 'Master Cook', sctnTitle, [{ class: "text-center" }]);
/**
 * creation select show Recipes
 */
const divContentsctnSelectShowRecipes = createMarkup('div', '', sctnSelect, [{ class: "d-flex justify-content-center flex-column" }]);
const labelShowRecipes = createMarkup('label', 'Choisir une recette', divContentsctnSelectShowRecipes, [{ class: "form-control" }]);
const selectShowRecipes = createMarkup('select', 'Choisir une recette', divContentsctnSelectShowRecipes, [{ class: "form-select", id:"select-all-recipes" }]);
/**
 * creation select show per country
 */
const divContentsctnSelectPerCountry = createMarkup('div', '', sctnSelect, [{ class: "d-flex justify-content-center flex-column" }]);
const labelPerCountry = createMarkup('label', 'Selectionner un pays', divContentsctnSelectPerCountry, [{ class: "form-control" }]);
const selectPerCountry = createMarkup('select', 'Selectionner un pays', divContentsctnSelectPerCountry, [{ class: "form-select", id: 'select-per-country' }]);
/**
 * creation select show per ingredient
 */
const divContentsctnSelectPerIngredient = createMarkup('div', '', sctnSelect, [{ class: "d-flex justify-content-center flex-column" }]);
const labelPerIngredient = createMarkup('label', 'Selectionner un Ingredient', divContentsctnSelectPerIngredient, [{ class: "form-control" }]);
const selectPerIngrendient = createMarkup('select', 'Selectionner un Ingredient', divContentsctnSelectPerIngredient, [{ class: "form-select", id: 'select-per-ingredient' }]);
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
    resetCreateRecipeModal();

    

    const modal = document.getElementById('myModal');
    const modalTitle = modal.querySelector('.modal-title');
    modalTitle.textContent = "creation de recette";
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
    const divCreateRecipesModalInput = createMarkup('div', '', divCreateRecipesModal, [{ class: "d-flex flex-row" }])
    createMarkup('input', '', divCreateRecipesModalInput, [{ class: "form-control my-1 mx-1", placeholder: "ingredient" }]);
    createMarkup('input', '', divCreateRecipesModalInput, [{ class: " my-1 mx-1",type:'number'}]);
    const selectCreateRecipes  =  createMarkup('select', 'Choisir une uniter', divCreateRecipesModalInput, [{ class: "unit form-select my-1 mx-1 "}]);
    fillSelectUnitCreateRecipesNew(arrayDataRecipes);
}
 



if (document.location.href.toString().includes("client")) {
    console.log(" ligne 73",);
    // fait requete pour recuperer les recette
    getAllRecipes();

}

/**
 * fonction asynchrone permetant la recuperation des recette et le declenchement de 4 fonction 
 */
async function getAllRecipes() {
    try {
        const response = await fetch(`${endPoint}/recipes`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        
        const dataRecipes = await response.json();
        arrayDataRecipes = dataRecipes;
        createRecipesCard(dataRecipes);
        fillSelectPerCountry(dataRecipes);
        fillSelectPerIngredient(dataRecipes);
        fillSelectUnitCreateRecipes(dataRecipes);
        fillSelectAllRecipes(dataRecipes);
        console.log("ligne 97", dataRecipes);

    }
    catch (error) {
        console.log(`erreur`, error);
    }
}

 //const selectRecipes = document.getElementById('select-all-recipes');
//selectPerCountry = document.getElementById('select-per-country');

/**
 * Listener pour la recuperation des recette par ingredient
 */
 const selectPerIngredient = document.getElementById('select-per-ingredient');

 selectPerIngredient.addEventListener('change', (event) => {
   console.log(`119`);
    let selectedIngredient = event.target.value;
    let filteredRecipes = arrayDataRecipes.filter(arrayDataRecipes => arrayDataRecipes.ingredients.includes(selectedIngredient));
    getRecipesByIngredientName(selectedIngredient);
    createRecipesCard(filteredRecipes); // Appeler la fonction avec le tableau filtré
    if (selectedIngredient == 'empty') {
        getAllRecipes();
    }
});
/**
 * Fonction permetant une requete pour la recuperation des recette par ingredient
 */
async function getRecipesByIngredientName(selectedIngredient) {
    try {
        const response = await fetch(`${endPoint}/recipes/?ingredient=${selectedIngredient}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        
        const dataRecipes = await response.json();
        arrayDataRecipes = dataRecipes;
        createRecipesCard(arrayDataRecipes);
        console.log("ligne 97",  arrayDataRecipes);

    }
    catch (error) {
        console.log(`erreur`, error);
    }
}
/**
 * Listener pour la recuperation des recette par Gastronomy
 */
selectPerCountry.addEventListener('change', (event) => {
    let selectedCountry = event.target.value;
    console.log(`ligne 160 selectedCountry`,selectedCountry);
    let filteredRecipes = arrayDataRecipes.filter(recipe => recipe.gastronomy === selectedCountry);
    getRecipesByGastronomyName(selectedCountry);
    createRecipesCard(filteredRecipes);
    if (selectedCountry == 'empty') {
        getAllRecipes();
    }
});

/**
 *  Fonction permetant une requete pour la recuperation des recette par Gastro (tourista)
 */
async function getRecipesByGastronomyName(selectedCountry) {
    try {
        console.log(`171`,selectedCountry);
        const response = await fetch(`${endPoint}/recipes/?gastronomy=${selectedCountry}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        
        const dataRecipes = await response.json();
        arrayDataRecipes = dataRecipes;
        createRecipesCard(arrayDataRecipes);
        console.log("ligne 183",  arrayDataRecipes);

    }
    catch (error) {
        console.log(`erreur`, error);
    }
}

selectShowRecipes.addEventListener('change', (event) => {
    event.preventDefault();
    let selectedId = event.target.value;
    console.log(`ligne 197 selectedCountry`,selectedId);
    let filteredRecipes = arrayDataRecipes.filter(recipe => recipe.id === selectedId);
    //getRecipesByName(selectedId);
    createRecipesCard(filteredRecipes);
    if (selectedId == 'empty') {
        getAllRecipes();
    }
});

/**
 * Remplissage du select par pays 
 */
function fillSelectAllRecipes(dataRecipes) {
    console.log("ligne 115 FillSelectPerCountry:", dataRecipes);
    const selectShowRecipes = document.getElementById("select-all-recipes");
    let htmlContent = "<option value='empty' selected>Choisir une recette</option>";
    dataRecipes.forEach(u => {
            htmlContent += `<option value="${u.id}">${u.title} : ${u.gastronomy}</option>`;
           //console.log(`ligne 121 `,htmlContent);
        })
        selectShowRecipes.innerHTML = htmlContent;
}



/**
 * Création des cards avec les recettes avec conversion des uniter
 */
function createRecipesCard(dataRecipes) {
    const sctnRecipes = document.getElementById('section-card-recipes');
    let htmlContent = "";
    dataRecipes.forEach(recipe => {
      let ingredientsHtml = "";
      recipe.ingredients.forEach(ingredient => {
        const convertedUnit = convertUnit(ingredient.unit);
        ingredientsHtml += `<li class="list-group-item my-2 rounded border border-black">${ingredient.name} : ${ingredient.quantity} ${convertedUnit}</li>`;
      });
      htmlContent += `<div class="card mx-2 my-2" style="width: 18rem;">
        <div class="card-body">
          <h4 class="gas" >Pays : ${recipe.gastronomy}</h4>
          <h5 class="card-title title">${recipe.title}</h5>
          <ul class="list-group">${ingredientsHtml}</ul>
          <button id="${recipe.id}" class="btn btn-success edit-recipes">Editer</button>
          <button id="${recipe.id}" class="btn btn-danger suppr">Supprimer</button>
        </div>
      </div>`;
    });
    sctnRecipes.innerHTML = htmlContent;
  }

  recipeCardsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-recipes')) {
      let selectedCard = event.target.id;
      console.log(`250`, selectedCard);
      editRecipeCard(selectedCard);
    }
  });
  
  


/**
 * 
 * Fonction a appeler avec un listener dans le code de creation des card 
 */function editRecipeCard(selectedCard) {
 // Récupérer l'élément de la "card" de recette à éditer
 let editButton = document.getElementById(selectedCard);
 let recipeCard = editButton.closest('.card');

 // Récupérer l'élément de titre de la recette à l'intérieur de la carte
 let recipeTitle = recipeCard.querySelector('.card-title').textContent;

  let recipeIngredients = recipeCard.querySelector('.list-group').textContent;
 
  let recipesGastronomy = recipeCard.querySelector('.gas').textContent;

  // Créer un objet recette avec les informations récupérées
  let recipe = {
    title: recipeTitle,
    ingredients: recipeIngredients,
    gastronomy: recipesGastronomy
  };

  // Appeler la fonction pour afficher la modal d'édition avec les éléments de la recette
  showEditModal(recipe);
}
function showEditModal(recipe) {
    // Récupérer la modal d'édition depuis le DOM
    const modal = document.getElementById('myModal');
  
    const modalTitle = modal.querySelector('.modal-title');
    modalTitle.textContent = "Modification de recette";

    // Récupérer les éléments de la modal
    const recipeNameInput = modal.querySelector('.modal-body input[placeholder="Nom de votre recette"]');
    const gastronomyInput = modal.querySelector('.modal-body input[placeholder="Gastronomie"]');
    const ingredientInputs = modal.querySelectorAll('.modal-body input[placeholder="ingredient"]');
    const unitSelects = modal.querySelectorAll('.modal-body select');
  
    // Pré-remplir les champs de la modal avec les valeurs de la recette
    recipeNameInput.value = recipe.title;
    gastronomyInput.value = recipe.gastronomy;
  
    // Pré-remplir les champs d'ingrédients avec les valeurs de la recette
    if (Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach((ingredient, index) => {
          if (ingredientInputs[index]) {
            ingredientInputs[index].value = ingredient.name;
          }
          if (quantityInputs[index]) {
            quantityInputs[index].value = ingredient.quantity;
          }
          if (unitSelects[index]) {
            // Pré-sélectionner l'option correspondant à l'unité de l'ingrédient
            const option = unitSelects[index].querySelector(`option[value="${ingredient.unit}"]`);
            if (option) {
              option.selected = true;
            }
          }
        });
      }
      
  
    // Afficher la modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  }
  
  
 


/**
 * Remplissage du select par pays 
 */
function fillSelectPerCountry(dataRecipes) {
    console.log("ligne 134 FillSelectPerCountry:", dataRecipes);
    const selectPerCountry = document.getElementById("select-per-country");
    let htmlContent = "<option value='empty' selected>Choisir un Pays</option>";
    let gastronomies = []; // Tableau pour stocker les gastronomies déjà ajoutées
    dataRecipes.forEach(u => {
        if (!gastronomies.includes(u.gastronomy)) {
            htmlContent += `<option value="${u.gastronomy}">${u.gastronomy}</option>`;
            gastronomies.push(u.gastronomy);
        }
    });
    selectPerCountry.innerHTML = htmlContent;
}


/**
 * Remplissage du select par ingredient
 */
function fillSelectPerIngredient(dataRecipes) {
    console.log("ligne 152 FillSelectPerIngredient :", dataRecipes);
    const selectPerIngredient = document.getElementById("select-per-ingredient");
    let htmlContent = "<option value='empty' selected>Choisir un Ingredient</option>";
    const uniqueIngredients = new Set();

    dataRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            uniqueIngredients.add(ingredient.name);
        });
    });

    uniqueIngredients.forEach(ingredient => {
        htmlContent += `<option value="${ingredient}">${ingredient}</option>`;
    });

    selectPerIngredient.innerHTML = htmlContent;
}

/**
 * Remplissage du select de create recipes avec conversion des uniter
 */
function fillSelectUnitCreateRecipes(dataRecipes) {
    console.log("ligne 152 FillSelectPerIngredient :", dataRecipes);
    const selectUnitCreateRecipes = document.getElementById('select-unit-create-recipes');
    const selectCreateRecipes = document.getElementsByClassName('unit');
    let htmlContent = "<option value='empty' selected>Choisir une unité</option>";
    const uniqueUnits = new Set();
  
    dataRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        uniqueUnits.add(convertUnit(ingredient.unit));
      });
    });
  
    uniqueUnits.forEach(unit => {
      htmlContent += `<option value="${unit}">${unit}</option>`;
    });
  
    selectUnitCreateRecipes.innerHTML = htmlContent;
    selectCreateRecipes.innerHTML = htmlContent;
  }
  

  
  function fillSelectUnitCreateRecipesNew(arrayDataRecipes) {
    console.log("ligne 227 fillSelectUnitCreateRecipesNew:", arrayDataRecipes);
    const selectCreateRecipesList = document.querySelectorAll('.unit');
    let htmlContent = "<option value='empty' selected>Choisir une unité</option>";
    const uniqueUnits = new Set();
  
    arrayDataRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        uniqueUnits.add(convertUnit(ingredient.unit));
        console.log(`tableau`, recipe.ingredients);
      });
    });
  
    uniqueUnits.forEach(unit => {
      htmlContent += `<option value="${unit}">${unit}</option>`;
      console.log(`htmlContent`, htmlContent);
    });
  
    selectCreateRecipesList.forEach(select => {
      select.innerHTML = htmlContent;
    });
  }
  
  

  /**
   *conversion des uniter 
   */
  function convertUnit(unit) {
    switch (unit) {
      case "UNIT_GRAM":
        return "gramme";
      case "UNIT_KILOGRAM":
        return "kilogrammes";
      case "UNIT_OBJECT":
        return "objet";
      case "UNIT_PACK":
        return "sachet";
      case "UNIT_SLICE":
        return "tranche";
      case "UNIT_MILLILITERS":
        return "millilitre";
      case "UNIT_LITER":
        return "litre";
      case "UNIT_TABLESPOON":
        return "cuillère à soupe";
      case "UNIT_TEASPOON":
        return "cuillère à café";
      case "UNIT_CUBE":
        return "cube";
      case "UNIT_POD":
        return "gousse";
      case "UNIT_PINCH":
        return "pincée";
      case "UNIT_PM":
        return "quantité selon le goût du cuisinier";
      default:
        return unit;
    }
  }
  
  /**
   * Reset de la modal avant appel pour la creation de recette 
   */

  function resetCreateRecipeModal() {
    const recipeNameInput = document.querySelector('.modal-body input[placeholder="Nom de votre recette"]');
    const gastronomyInput = document.querySelector('.modal-body input[placeholder="Gastronomie"]');
    const ingredientInputs = document.querySelectorAll('.modal-body input[placeholder="ingredient"]');
    const unitSelects = document.querySelectorAll('.modal-body select');
  
    recipeNameInput.value = "";
    gastronomyInput.value = "";
    ingredientInputs.forEach(input => input.value = "");
    unitSelects.forEach(select => select.selectedIndex = 0);
  }
  