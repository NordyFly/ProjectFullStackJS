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



// Essaye ce code by Noureddine
function createRecipesCard(dataRecipes) {
  const sctnRecipes = document.getElementById('section-card-recipes');
  let htmlContent = "";
  dataRecipes.forEach((recipe, index) => { // Parcours de chaque recette dans les données
    let ingredientsHtml = "";
    recipe.ingredients.forEach(ingredient => { // Parcours de chaque ingrédient dans la recette
      const convertedUnit = convertUnit(ingredient.unit); // Conversion de l'unité de mesure
      // Création des éléments HTML pour chaque ingrédient, y compris un champ de texte caché pour l'édition
      ingredientsHtml += `
        <li class="list-group-item my-2 rounded border border-black">
          <span class="ingredient-name">${ingredient.name}</span> : 
          <span class="ingredient-quantity">${ingredient.quantity}</span>
          <span class="ingredient-unit">${convertedUnit}</span>
          <input type="text" class="ingredient-input" value="${ingredient.quantity}" style="display: none;">
        </li>`;
    });
    // Création de la carte de recette avec l'index comme identifiant unique
    htmlContent += `<div class="card mx-2 my-2" id="card${index}" style="width: 18rem;">
      <div class="card-body">
        <h4 class="card-title" >Pays : ${recipe.gastronomy}</h4>
        <h5 class="card-title">${recipe.title}</h5>
        <ul class="list-group recipe-ingredients">${ingredientsHtml}</ul>
        <button id="edit-${index}" class="btn btn-success edit-recipes">Editer</button>
        <button id="delete-${index}" class="btn btn-danger suppr">Supprimer</button>
      </div>
    </div>`;
  });
  sctnRecipes.innerHTML = htmlContent; // Ajout du contenu HTML des cartes de recette dans la section 'section-card-recipes'

  const btnEditCards = document.getElementsByClassName('edit-recipes'); // Sélection de tous les boutons d'édition

  for (let i = 0; i < btnEditCards.length; i++) { // Parcours de chaque bouton d'édition
    btnEditCards[i].addEventListener('click', (event) => { // Ajout d'un écouteur d'événement au clic sur le bouton d'édition
      const card = event.target.closest('.card'); // Récupération de la carte parente du bouton
      if (card) {
        toggleEditInputs(card); // Appel de la fonction pour basculer entre l'affichage et l'édition des ingrédients
      }
    });
  }
}

function toggleEditInputs(card) {
  const ingredientElements = card.querySelectorAll(".list-group-item"); // Sélection de tous les éléments d'ingrédients
  ingredientElements.forEach(ingredientElement => { // Parcours de chaque élément d'ingrédient
    const quantityElement = ingredientElement.querySelector(".ingredient-quantity"); // Sélection de l'élément de quantité
    const inputElement = ingredientElement.querySelector(".ingredient-input"); // Sélection de l'élément de champ de texte
    const editButton = card.querySelector(".edit-recipes"); // Sélection du bouton d'édition

    if (inputElement.style.display === "none") { // Si le champ de texte est caché, on le rend visible pour l'édition
      inputElement.style.display = "inline-block";
      quantityElement.style.display = "none";
      editButton.textContent = "Enregistrer"; // Changement du texte du bouton pour indiquer que l'édition est en cours
    } else { // Si le champ de texte est visible, on le cache et enregistre la nouvelle valeur
      inputElement.style.display = "none";
      quantityElement.style.display = "inline-block";
      editButton.textContent = "Editer"; // Changement du texte du bouton pour indiquer que l'on peut éditer
      quantityElement.textContent = inputElement.value; // Enregistrement de la nouvelle valeur dans l'élément span de quantité
    }
  });
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
  
  