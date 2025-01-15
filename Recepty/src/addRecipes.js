console.log("uh hello world agaign");

import { insertRow } from "./utils";

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

function deleteAddedValue() {
  let deleteButtons = document.querySelectorAll(".deleteButton");

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      deleteButton.parentElement.remove();
    });
  });
}

function postRecipe() {
  let titleToPost = document.querySelector(".addedTitle span").innerHTML;

  insertRow(titleToPost);
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
