//console.log("uh hello world agaign");

import { insertRow } from "./utils";

//function for adding new ingredients in form of inputs
function addIngredient() {
  let addIngredientButton = document.querySelector(".addIngredientButton");
  let addIngredientForm = document.querySelector(".addIngredient");
  let ingredientInput = document.querySelector(".addIngredientInput");
  const ingredientPlaceHolder = document.querySelector(".addedIngredientsList");
  let newIngredientClass = "addedIngredient";

  addIngredientButton.addEventListener("click", (event) => {
    console.log(ingredientInput.value);

    let newIngredient = document.createElement("li");

    newIngredient.innerHTML = `
    <div class="input-group mb-3">
        <input type="text" name="addedIngredient" class="form-control addIngredientInput" value="${ingredientInput.value}"></input>
        <button class="deleteButton btn btn-outline-secondary addIngredientButton">X</button>
    </div>
  `;

    newIngredient.classList.add(newIngredientClass);

    ingredientPlaceHolder.appendChild(newIngredient);

    ingredientInput.value = "";

    deleteAddedValue();
  });
}

// function that wil create new li elements with added values
function addNewSmthing(addSmthingForm, input, placeHolder, newClass) {
  addSmthingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log(input.value);

    if (input.value) {
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
      deleteButton.closest("li").remove();
    });
  });
}

//function that will post new recipe to supabase
function postRecipe() {
  let titleToPost = document.querySelector(".addTitleInput");
  let ingredientsToPost = document.querySelectorAll(".addedIngredient span");
  let stepsToPost = document.querySelectorAll(".addedStep span");

  console.log(titleToPost.value);

  if (
    titleToPost.value !== "" &&
    ingredientsToPost.length !== 0 &&
    stepsToPost.length !== 0
  ) {
    titleToPost = titleToPost.value;
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

// let addIngredientForm = document.querySelector(".addIngredient");
// let ingredientInput = document.querySelector(".addIngredientInput");
// const ingredientPlaceHolder = document.querySelector(".addedIngredientsList");
// let newIngredientClass = "addedIngredient";

// addNewSmthing(
//   addIngredientForm,
//   ingredientInput,
//   ingredientPlaceHolder,
//   newIngredientClass
// );
addIngredient();

let addStepForm = document.querySelector(".addStep");
let stepTextArea = document.querySelector(".addStepTextArea");
const stepPlaceHolder = document.querySelector(".addedStepsList");
let newStepClass = "addedStep";

addNewSmthing(addStepForm, stepTextArea, stepPlaceHolder, newStepClass);

let postButton = document.querySelector(".saveRecipeButton");

postButton.addEventListener("click", () => {
  postRecipe();
});
