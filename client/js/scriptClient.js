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
const selectShowRecipes = createMarkup('select', 'Choisir une recette', divContentsctnSelectShowRecipes, [{ class: "form-select", id: "select-all-recipes" }]);
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
    //resetCreateRecipeModal();



    const modal = document.getElementById('myModal');
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    // Masquer la modale
    bootstrapModal.hide();

}

/**
 * listener sur le button ajout d'ingredient de la modal creation de recette et sur le bouton enregistré
 */
document.getElementById('btn-add-ingredient').addEventListener('click', addInputIngredient);
document.getElementById('btn-record-edit').addEventListener('click',recordRecipe);
/**
 * Function déclencher par le listener sur le button ajout d'ingredient
 */function addInputIngredient() {
    const divCreateRecipesModal = document.getElementById('bloc-ingredient');
    const divCreateRecipesModalInput = createMarkup('div', '', divCreateRecipesModal, [{ class: "d-flex flex-row value-ingredient-create" }]);
    createMarkup('input', '', divCreateRecipesModalInput, [{ class: "form-control my-1 mx-1 ", placeholder: "ingredient" }]);
    createMarkup('input', '', divCreateRecipesModalInput, [{ class: "my-1 mx-1", type: 'number' }]);
    const selectCreateRecipes = createMarkup('select', 'Choisir une uniter', divCreateRecipesModalInput, [{ class: "unit-select unit form-select my-1 mx-1" }]);
    fillSelectUnitCreateRecipesNew(arrayDataRecipes);
}

async function recordRecipe(){
    //recup donéé de la modal 
    const title = document.getElementById('title').value;
    const gastronomy = document.getElementById('gastronomy').value;
    console.log(`title et gastronomy`,title,gastronomy);
    const tabValueIngredient = document.getElementsByClassName('value-ingredient-create');
    const tab = Array.from(tabValueIngredient);
   
    console.log(`tab`,tab);
    if (tabValueIngredient.length > 0) {
        //faire boucle pour recup les trois enfant de la div avec leur value 
       let tabIngredient = [];
        tab.forEach(d => {
            let element = d.children;
            let ingredientName =    element.item(0).value;
            let quantity = element.item(1).value;
            let unit = element.item(2).value;
            let obj = {
                name : ingredientName ,
                quantity: quantity,
                unit: reverseConvertUnit(unit)
            }
            tabIngredient.push(obj);
            console.log(`103 objet`,obj);
            console.log(`104 element`,ingredientName);
            
        })
        console.log(` 107 tableau `,tabIngredient);
        try {
            //construction du body de request
            const bodyRequest = {
                title: title,
                ingredients: tabIngredient
            }
            console.log(`117 requestBody`, bodyRequest);
            
            const response = await fetch(`${endPoint}/recipes?gastronomy=${gastronomy}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(bodyRequest)
            })
            getAllRecipes();

        } catch (error) {
            console.error('error', error);
        }
    }
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


/**
 * Listener pour la recuperation des recette par ingredient
 */
const selectPerIngredient = document.getElementById('select-per-ingredient');

selectPerIngredient.addEventListener('change', (event) => {
    console.log(`119`);
    let selectedIngredient = event.target.value;

    if (selectedIngredient == 'empty') {
        getAllRecipes();
    } else {
        let filteredRecipes = arrayDataRecipes
        getRecipesByIngredientName(selectedIngredient);
        createRecipesCard(filteredRecipes); // Appeler la fonction avec le tableau filtré
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
        console.log("ligne 97", arrayDataRecipes);

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
    if (selectedCountry == 'empty') {
        getAllRecipes();
    } else {
        console.log(`ligne 160 selectedCountry`, selectedCountry);
        getRecipesByGastronomyName(selectedCountry);
        let filteredRecipes = arrayDataRecipes
        createRecipesCard(filteredRecipes);
    }
});

/**
 *  Fonction permetant une requete pour la recuperation des recette par Gastro (tourista)
 */
async function getRecipesByGastronomyName(selectedCountry) {
    try {
        console.log(`171`, selectedCountry);
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
        console.log("ligne 183", arrayDataRecipes);

    }
    catch (error) {
        console.log(`erreur`, error);
    }
}

/**
 * Listener pour la recuperation des recette pour le select des recette
 */
selectShowRecipes.addEventListener('change', (event) => {
    event.preventDefault();
    let selectedId = event.target.value;
    console.log(`ligne 255 selectedCountry`, selectedId);
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
    htmlContent += `<div class="card mx-2 my-2" id="${recipe.id}" style="width: 18rem;">
      <div class="card-body">
        <h4 class="card-title">Pays : ${recipe.gastronomy}</h4>
        <h5 class="card-title-element">${recipe.title}</h5>
        <ul class="list-group recipe-ingredients">${ingredientsHtml}</ul>
        <button id="edit-${index}" class="btn btn-success edit-recipes">Editer</button>
        <button id="delete-${index} " class="btn btn-danger suppr">Supprimer</button>
      </div>
    </div>`;
  });
  sctnRecipes.innerHTML = htmlContent; // Ajout du contenu HTML des cartes de recette dans la section 'section-card-recipes'

  const btnEditCards = document.getElementsByClassName('edit-recipes'); // Sélection de tous les boutons d'édition
  const btnSupprCard = document.getElementsByClassName('suppr'); // Sélection de tous les boutons suppresion

  for (let i = 0; i < btnEditCards.length; i++) { // Parcours de chaque bouton d'édition
    btnEditCards[i].addEventListener('click', (event) => { // Ajout d'un écouteur d'événement au clic sur le bouton d'édition
      const card = event.target.closest('.card'); // Récupération de la carte parente du bouton
      if (card) {
        toggleEditInputs(card); // Appel de la fonction pour basculer entre l'affichage et l'édition des ingrédients
      }
    });
  }
  for (let i = 0; i < btnSupprCard.length; i++) { // Parcours de chaque bouton d'édition
    btnSupprCard[i].addEventListener('click', (event) => { // Ajout d'un écouteur d'événement au clic sur le bouton d'édition
      const card = event.target.closest('.card'); // Récupération de la carte parente du bouton
      if (card) {
        let recipeId = card.id;
        console.log(`276`, recipeId);
        deleteRecipes(recipeId);
      }
    });
  }
}


async function deleteRecipes(recipeId) {
  try {
    console.log(`Recipe ID to delete:`, recipeId);
    const response = await fetch(`${endPoint}/recipes/${recipeId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur lors de la suppression :", errorData);
      return;
    }

    const deletedData = await response.json();
    console.log("Recipe successfully deleted:", deletedData);
    getAllRecipes();
  } catch (error) {
    console.error(`erreur`, error);
  }
}

function updateCardData(recipeId, updatedRecipe) {
  const recipeCard = document.getElementById(recipeId);
  if (!recipeCard) {
    console.error(`La carte de recette avec l'ID ${recipeId} n'a pas été trouvée.`);
    return;
  }

  const titleElement = recipeCard.querySelector('.card-title-element');
  const gastronomyElement = recipeCard.querySelector('.card-gastronomy');
  const ingredientElements = recipeCard.querySelectorAll('.list-group-item');

  titleElement.textContent = updatedRecipe.title;
  gastronomyElement.textContent = updatedRecipe.gastronomy;

  updatedRecipe.ingredients.forEach((updatedIngredient, index) => {
    const ingredientElement = ingredientElements[index];
    if (ingredientElement) {
      const nameElement = ingredientElement.querySelector('.ingredient-name');
      const quantityElement = ingredientElement.querySelector('.ingredient-quantity');
      const unitElement = ingredientElement.querySelector('.ingredient-unit');

      nameElement.textContent = updatedIngredient.name;
      quantityElement.textContent = updatedIngredient.quantity;
      unitElement.textContent = convertUnit(updatedIngredient.unit);
    }
  });
}

async function saveRecipeOnServer(recipeId, updatedRecipe) {
  try {
    const response = await fetch(`${endPoint}/recipes/${recipeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(updatedRecipe)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur lors de la mise à jour :", errorData);
      return;
    }

    const updatedData = await response.json();
    console.log("Mise à jour réussie :", updatedData);
    updateCardData(recipeId, updatedData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
  }
}


function toggleEditInputs(card) {
    const ingredientElements = card.querySelectorAll(".list-group-item");
    const titleElement = card.querySelector(".card-title-element"); // Correction : Utiliser la classe "card-title" pour récupérer le titre de la recette
    ingredientElements.forEach(ingredientElement => {
      const nameElement = ingredientElement.querySelector(".ingredient-name");
      const quantityElement = ingredientElement.querySelector(".ingredient-quantity");
      const unitElement = ingredientElement.querySelector(".ingredient-unit");
      const inputElement = ingredientElement.querySelector(".ingredient-input");
      const editButton = card.querySelector(".edit-recipes");
  
      if (inputElement.style.display === "none") {
        inputElement.style.display = "inline-block";
        quantityElement.style.display = "none";
        editButton.textContent = "Enregistrer";
      } else {
        inputElement.style.display = "none";
        quantityElement.style.display = "inline-block";
        editButton.textContent = "Editer";
        quantityElement.textContent = inputElement.value;
  
        // Récupérer les données mises à jour
        const updatedData = {
          title: titleElement.textContent.trim(),
          ingredients: Array.from(ingredientElements).map(element => {
            return {
              name: element.querySelector(".ingredient-name").textContent.trim(),
              quantity: element.querySelector(".ingredient-input").value.trim(),
              unit: element.querySelector(".ingredient-unit").textContent.trim()
            };
          })
        };
  
        const recipeId = card.id;
        saveRecipeOnServer(recipeId, updatedData);
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
    console.log("ligne 476 FillSelectPerIngredient :", dataRecipes);
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

function reverseConvertUnit(unit) {
    switch (unit) {
        case "gramme":
            return "UNIT_GRAM";
        case "kilogrammes":
            return "UNIT_KILOGRAM";
        case "objet":
            return "UNIT_OBJECT";
        case "sachet":
            return "UNIT_PACK";
        case "tranche":
            return "UNIT_SLICE";
        case "millilitre":
            return "UNIT_MILLILITERS";
        case "litre":
            return "UNIT_LITER";
        case "cuillère à soupe":
            return "UNIT_TABLESPOON";
        case "cuillère à café":
            return "UNIT_TEASPOON";
        case "cube":
            return "UNIT_CUBE";
        case "gousse":
            return "UNIT_POD";
        case "pincée":
            return "UNIT_PINCH";
        case "quantité selon le goût du cuisinier":
            return "UNIT_PM";
        default:
            return unit;
    }
}


/**
 * Reset de la modal avant appel pour la creation de recette 
*/
function resetCreateRecipeModal() {
    const modal = document.getElementById('myModal');
    const recipeNameInput = modal.querySelector('.modal-body input[placeholder="Nom de votre recette"]');
    const gastronomyInput = modal.querySelector('.modal-body input[placeholder="Gastronomie"]');
    const ingredientInputs = modal.querySelectorAll('.modal-body input');
    const quantityInputs = modal.querySelectorAll('.modal-body input[type="number"]');
    const unitSelects = modal.querySelectorAll('.modal-body select.unit-select');

    // Supprimer les inputs supplémentaires
    ingredientInputs.forEach((input, index) => {
        if (index > 0) {
            input.parentNode.remove();
            if (quantityInputs[index]) {
                quantityInputs[index].parentNode.remove(); // Supprimer également l'élément de quantité correspondant
            }

        }
    });

    // Réinitialiser les champs
    recipeNameInput.value = "";
    gastronomyInput.value = "";
    ingredientInputs.forEach(input => input.value = "");
    quantityInputs.forEach(input => input.value = ""); // Réinitialiser également les champs de quantité
    unitSelects.forEach(select => select.selectedIndex = 0);
}