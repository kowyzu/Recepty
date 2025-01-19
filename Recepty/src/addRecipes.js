//console.log("uh hello world agaign");

import { insertRow } from "./utils";

// function that wil create new li elements with added values
function addNewSmthing(addSmthingForm, input, placeHolder, newClass) {
  addSmthingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
      addSmthingForm.className === "addTitle" &&
      placeHolder.childElementCount === 1
    ) {
      alert(
        "Název může mít jen jednu hodnotu. Co je moc, to je příliš - i v kuchyni!"
      );
    } else {
      let newValue = document.createElement("li");

      newValue.innerHTML = `
        <span>${input.value}</span>
        <button class="deleteButton">X</button>
  `;

      newValue.classList.add(newClass);

      placeHolder.appendChild(newValue);

      input.value = "";

      deleteAddedValue();
    }
  });

  if (input.nodeName === "TEXTAREA") {
    addSmthingForm.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        event.preventDefault;
        addSmthingForm.requestSubmit();
      }
    });
  }
}

//function that will get value from select form
function selectSmthing(selectForm) {
  const indexOfSelection = selectForm.selectedIndex;
  const selectedValue = selectForm[indexOfSelection].innerText;

  if (indexOfSelection !== 0) {
    return selectedValue;
  } else {
    return null;
  }
}

// function that will delete value in added li element after click on cross button
function deleteAddedValue() {
  let deleteButtons = document.querySelectorAll(".deleteButton");

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      deleteButton.parentElement.remove();
    });
  });
}

//function that will post new recipe to supabase
function postRecipe() {
  let titleToPost = document.querySelector(".addedTitle span");
  let ingredientsToPost = document.querySelectorAll(".addedIngredient span");
  let stepsToPost = document.querySelectorAll(".addedStep span");

  if (
    titleToPost !== null &&
    ingredientsToPost.length !== 0 &&
    stepsToPost.length !== 0
  ) {
    titleToPost = titleToPost.innerText;
    let arrayOfIngredients = arrayCompilator(ingredientsToPost);
    let arrayOfSteps = arrayCompilator(stepsToPost);
  } else {
    console.log("chybi hodnota");
  }

  let selectCategoryForm = document.querySelector(".selectCategoryForm");
  let selectTimeForm = document.querySelector(".selectTimeForm");

  let category = selectSmthing(selectCategoryForm);
  console.log(category);
  let time = selectSmthing(selectTimeForm);
  console.log(time);

  //   insertRow(titleToPost, arrayOfIngredients, arrayOfSteps);
}

//function that will compile new array
function arrayCompilator(nodeList) {
  let arrayOfSmthing = [];

  nodeList.forEach((node) => {
    arrayOfSmthing.push(node.innerText.trim());
  });

  return arrayOfSmthing;
}

/////////////////
//Main Program//
///////////////

let addTitleForm = document.querySelector(".addTitle");
let titleInput = document.querySelector(".addTitleInput");
const titlePlaceHolder = document.querySelector(".addedTitleList");
let newTitleClass = "addedTitle";

addNewSmthing(addTitleForm, titleInput, titlePlaceHolder, newTitleClass);

let addIngredientForm = document.querySelector(".addIngredient");
let ingredientInput = document.querySelector(".addIngredientInput");
const ingredientPlaceHolder = document.querySelector(".addedIngredientsList");
let newIngredientClass = "addedIngredient";

addNewSmthing(
  addIngredientForm,
  ingredientInput,
  ingredientPlaceHolder,
  newIngredientClass
);

let addStepForm = document.querySelector(".addStep");
let stepTextArea = document.querySelector(".addStepTextArea");
const stepPlaceHolder = document.querySelector(".addedStepsList");
let newStepClass = "addedStep";

addNewSmthing(addStepForm, stepTextArea, stepPlaceHolder, newStepClass);

let postButton = document.querySelector(".saveRecipeButton");

postButton.addEventListener("click", () => {
  postRecipe();
});
