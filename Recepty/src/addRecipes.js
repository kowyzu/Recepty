//console.log("uh hello world agaign");

import { insertRow } from "./utils";
import "animate.css";

//function for adding new ingredients in form of inputs
function addIngredient() {
  // let ingredientInput = document.querySelector("#input-1");

  const ingredientPlaceHolder = document.querySelector(".addedIngredientsList");

  let newIngredientClass = "addedIngredient";

  let newIngredient = document.createElement("li");

  newIngredient.innerHTML = `
    <div class="input-group mb-3">
        <input type="text" name="addedIngredient" class="form-control addedIngredientInput" "/>
        <button class="deleteButton btn btn-outline-secondary">X</button>
    </div>
  `;

  newIngredient.classList.add(
    newIngredientClass,
    "animate__animated",
    "animate__pulse"
  );

  ingredientPlaceHolder.appendChild(newIngredient);

  newIngredient.querySelector("input").focus();
}

//function for adding new steps in form of textAreas
function addStep() {
  const stepPlaceHolder = document.querySelector(".addedStepsList");

  let newStepClass = "addedStep";

  let newStep = document.createElement("li");

  newStep.innerHTML = `
    <div class="input-group mb-3">
      <textarea name="addedStep"  class="form-control addedStepTextArea"></textarea>
      <button class="deleteButton btn btn-outline-secondary">X</button>
    </div>
  `;

  newStep.classList.add(newStepClass, "animate__animated", "animate__pulse");

  stepPlaceHolder.appendChild(newStep);

  newStep.querySelector("textarea").focus();
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
async function postRecipe() {
  let titleToPost = document.querySelector(".addTitleInput");

  let ingredientsToPost = document
    .querySelector(".addedIngredientsList")
    .querySelectorAll("li");

  let arrayOfIngredients = [];

  ingredientsToPost.forEach((ingredientToPost) => {
    if (ingredientToPost.querySelector("input").value !== "") {
      arrayOfIngredients.push(ingredientToPost.querySelector("input").value);
    } else {
      return;
    }
  });

  let stepsToPost = document
    .querySelector(".addedStepsList")
    .querySelectorAll("li");

  let arrayOfSteps = [];

  stepsToPost.forEach((stepToPost) => {
    if (stepToPost.querySelector("textarea").value !== "") {
      arrayOfSteps.push(stepToPost.querySelector("textarea").value);
    } else {
      return;
    }
  });

  let selectCategoryForm = document.querySelector(".selectCategoryForm");
  let selectTimeForm = document.querySelector(".selectTimeForm");

  let category = selectSmthing(selectCategoryForm);

  let time = selectSmthing(selectTimeForm);

  if (
    titleToPost.value !== "" &&
    ingredientsToPost.length === arrayOfIngredients.length &&
    stepsToPost.length === arrayOfSteps.length &&
    category !== null &&
    time !== null
  ) {
    titleToPost = titleToPost.value;

    try {
      const { error } = await insertRow(
        titleToPost,
        arrayOfIngredients,
        arrayOfSteps,
        category,
        time
      );

      if (error !== null) {
        console.error("Error inserting recipe:", error);
        const toastError = document.getElementById("toastError");
        const toastBootstrapError =
          bootstrap.Toast.getOrCreateInstance(toastError);
        toastBootstrapError.show();
      } else {
        console.log("Recipe added successfully!");
        const toastSuccess = document.getElementById("toastSuccess");
        const toastBootstrapSuccess =
          bootstrap.Toast.getOrCreateInstance(toastSuccess);
        toastBootstrapSuccess.show();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      const toastError = document.getElementById("toastError");
      const toastBootstrapError =
        bootstrap.Toast.getOrCreateInstance(toastError);
      toastBootstrapError.show();
    }
  } else {
    const toastMissingFields = document.getElementById("toastMissingFields");
    const toastBootstrapMissingFields =
      bootstrap.Toast.getOrCreateInstance(toastMissingFields);
    toastBootstrapMissingFields.show();
  }
}

//function that will compile new array
// function arrayCompilator(nodeList) {
//   let arrayOfSmthing = [];

//   nodeList.forEach((node) => {
//     arrayOfSmthing.push(node.innerText.trim());
//   });

//   return arrayOfSmthing;
// }

//function for letting user know that he needs to add some value
function valueWarning(shakeTarget, changeColorTarget, warningText) {
  // let warningText = document.querySelector(".valueWarning");

  shakeTarget.classList.add("animate__animated");
  shakeTarget.classList.add("animate__headShake");
  changeColorTarget.classList.add("warningColor");

  warningText.style.display = "block";

  setTimeout(() => {
    shakeTarget.classList.remove("animate__animated");
    shakeTarget.classList.remove("animate__headShake");
    changeColorTarget.classList.remove("warningColor");
  }, "2000");

  changeColorTarget.addEventListener("input", (event) => {
    warningText.classList.add("animate__fadeOut");

    setTimeout(() => {
      warningText.style.display = "none";
      warningText.classList.remove("animate__fadeOut");
    }, "2000");
  });
}

/////////////////
//Main Program//
///////////////

// add new ingredient input by button
let ingredientsUl = document.querySelector(".addedIngredientsList");
let addIngredientButton = document.querySelector(".addIngredientButton");
let inputValueWarning = document.querySelector(".inputValueWarning");

addIngredientButton.addEventListener("click", () => {
  let lastLiElement = ingredientsUl.lastElementChild;
  let lastInput = ingredientsUl.lastElementChild.querySelector("input");
  if (lastInput.value !== "") {
    addIngredient();
  } else {
    valueWarning(lastLiElement, lastInput, inputValueWarning);
  }
});

// add new ingredient input by enter
ingredientsUl.addEventListener("keyup", (event) => {
  let lastInput = ingredientsUl.lastElementChild.querySelector("input");
  if (
    event.key === "Enter" &&
    event.target.value.trim() !== "" &&
    event.target === lastInput
  ) {
    event.preventDefault();
    addIngredient();
  } else if (event.key === "Enter") {
    let closestLiElement = event.target.closest("li");
    lastInput = ingredientsUl.lastElementChild.querySelector("input");
    valueWarning(closestLiElement, lastInput, inputValueWarning);
  }
});

//delete specific ingredient input by specific delete button
ingredientsUl.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("deleteButton") &&
    ingredientsUl.childElementCount > 1
  ) {
    event.target.closest("li").remove();
  } else if (event.target.classList.contains("deleteButton")) {
    let closestLiElement = event.target.closest("li");

    let closestInput = event.target
      .closest("li")
      .querySelector(".addedIngredientInput");
    valueWarning(closestLiElement, closestInput);
  }
});

// add new step textarea by button
let addStepButton = document.querySelector(".addStepButton");
let stepValueWarning = document.querySelector(".stepValueWarning");
let stepsOl = document.querySelector(".addedStepsList");

addStepButton.addEventListener("click", () => {
  let lastLiElement = stepsOl.lastElementChild;
  let lastTextArea = stepsOl.lastElementChild.querySelector("textarea");

  if (lastTextArea.value !== "") {
    addStep();
  } else {
    valueWarning(lastLiElement, lastTextArea, stepValueWarning);
  }
});

//delete specific step textarea by specific delete button
stepsOl.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("deleteButton") &&
    stepsOl.childElementCount > 1
  ) {
    event.target.closest("li").remove();
  } else if (event.target.classList.contains("deleteButton")) {
    let closestLiElement = event.target.closest("li");

    let closestTextArea = event.target
      .closest("li")
      .querySelector(".addedStepTextArea");
    valueWarning(closestLiElement, closestTextArea);
  }
});

let postButton = document.querySelector(".saveRecipeButton");

postButton.addEventListener("click", () => {
  postRecipe();
});
