//console.log("uh hello world agaign");

import { insertRow } from "./utils";
import "animate.css";

//function for adding new ingredients in form of inputs
function addIngredient() {
  let ingredientInput = document.querySelector("#input-1");

  const ingredientPlaceHolder = document.querySelector(".addedIngredientsList");
  let newIngredientClass = "addedIngredient";

  let newIngredient = document.createElement("li");

  newIngredient.innerHTML = `
    <div class="input-group mb-3">
        <input type="text" name="addedIngredient" class="form-control addedIngredientInput" value="${ingredientInput.value}"/>
        <button class="deleteButton btn btn-outline-secondary">X</button>
    </div>
  `;

  newIngredient.classList.add(newIngredientClass);

  ingredientPlaceHolder.appendChild(newIngredient);

  ingredientInput.value = "";
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

let addIngredientButton = document.querySelector(".addIngredientButton");

addIngredientButton.addEventListener("click", (event) => {
  if (document.querySelector("#input-1").value !== "") {
    addIngredient();
  } else {
    document.querySelector("#input-1").classList.add("animate__animated");
    document.querySelector("#input-1").classList.add("animate__headShake");
    setTimeout(() => {
      document.querySelector("#input-1").classList.remove("animate__animated");
      document.querySelector("#input-1").classList.remove("animate__headShake");
    }, "1000");
  }
});

let ingredientsUl = document.querySelector(".addedIngredientsList");
console.log(ingredientsUl);

ingredientsUl.addEventListener("click", (event) => {
  console.log(event);
  if (
    event.target.classList.contains("deleteButton") &&
    ingredientsUl.childElementCount > 1
  ) {
    event.target.closest("li").remove();
  } else if (event.target.classList.contains("deleteButton")) {
    event.target.closest("li").classList.add("animate__animated");
    event.target.closest("li").classList.add("animate__headShake");
    setTimeout(() => {
      event.target.closest("li").classList.remove("animate__animated");
      event.target.closest("li").classList.remove("animate__headShake");
    }, "1000");
  }
});

ingredientsUl.addEventListener("keyup", (event) => {
  if (
    event.target.classList.contains("addedIngredientInput") &&
    event.key === "Enter" &&
    event.target.value.trim() !== ""
  ) {
    event.preventDefault();
    addIngredient();
  } else if (event.key === "Enter") {
    event.target.closest("li").classList.add("animate__animated");
    event.target.closest("li").classList.add("animate__headShake");
    setTimeout(() => {
      event.target.closest("li").classList.remove("animate__animated");
      event.target.closest("li").classList.remove("animate__headShake");
    }, "1000");
  }
});

let addStepForm = document.querySelector(".addStep");
let stepTextArea = document.querySelector(".addStepTextArea");
const stepPlaceHolder = document.querySelector(".addedStepsList");
let newStepClass = "addedStep";

addNewSmthing(addStepForm, stepTextArea, stepPlaceHolder, newStepClass);

let postButton = document.querySelector(".saveRecipeButton");

postButton.addEventListener("click", () => {
  postRecipe();
});
