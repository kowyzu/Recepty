// console.log("uh hello world agaign");

import { insertRow } from "./utils";
import "animate.css";

function addTitleToLocalStorage() {
  let title = document.querySelector(".addTitleInput");
  localStorage.removeItem("title");

  if (title.value.trim() !== "") {
    localStorage.setItem("title", title.value);
  }
}

//function for adding new ingredients in form of inputs
function addIngredient() {
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

  let allIngredients = document
    .querySelector(".addedIngredientsList")
    .querySelectorAll("li");

  let arrayOfIngredients = extractValuesFromList(allIngredients, "input");

  addArrayToLocalStorage("ingredients", arrayOfIngredients);
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

  let allSteps = document
    .querySelector(".addedStepsList")
    .querySelectorAll("li");

  let arrayOfSteps = extractValuesFromList(allSteps, "textarea");

  addArrayToLocalStorage("steps", arrayOfSteps);
}

//add array to localStorage
function addArrayToLocalStorage(keyName, arrayOfValues) {
  localStorage.removeItem(keyName);

  localStorage.setItem(keyName, JSON.stringify(arrayOfValues));
}

//function that will get value from select form
function selectFormValue(selectForm) {
  const indexOfSelection = selectForm.selectedIndex;
  const selectedValue = selectForm[indexOfSelection].innerText;

  if (indexOfSelection !== 0) {
    return selectedValue;
  } else {
    return null;
  }
}

//Extracts non-empty values from input or textarea elements inside a list of <li> items.
function extractValuesFromList(listItems, inputType) {
  let extractedValues = [];

  listItems.forEach((listItem) => {
    if (listItem.querySelector(inputType).value !== "") {
      extractedValues.push(listItem.querySelector(inputType).value.trim());
    } else {
      return;
    }
  });

  return extractedValues;
}

//Shows toast with additional information
function showToast(typeOfNotification, notificationText) {
  const toastToShow = document.createElement("div");

  let iconType;
  let iconColor;

  if (typeOfNotification === "success") {
    iconType = "fa-check";
    iconColor = "#63E6BE";
  } else {
    iconType = "fa-triangle-exclamation";
    iconColor = "#870828";
  }

  toastToShow.innerHTML = `
  <div aria-live="polite" aria-atomic="true" class="position-relative">

    <div class="toast-container top-0 end-0 ">

      <div id="toastToShow" class="toast fixed-top fixedTopRight" role="alert" aria-live="assertive" aria-atomic="true">

        <div class="toast-header">

          <i class="fa-solid ${iconType}" style="color: ${iconColor};"></i>

          <strong class="me-auto"></strong>

          <button type="button" class="btn btn-close toastBtn" data-bs-dismiss="toast" aria-label="Close"></button> 

        </div>

        <div class="toast-body">
          ${notificationText}
        </div>

      </div> 

    </div> 

  </div> 
`;

  document.body.appendChild(toastToShow);

  const toastTest = document.getElementById("toastToShow");

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastTest);
  toastBootstrap.show();
}

//Change button to spinner
function buttonSpinner() {
  const targetButton = document.querySelector(".saveRecipeButton");
  targetButton.setAttribute("disabled", "true");

  targetButton.innerHTML = `                  
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span class="visually-hidden" role="status">Loading...</span>
    `;
}

//Resets the previous button
function buttonReset() {
  const targetButton = document.querySelector(".saveRecipeButton");
  targetButton.removeAttribute("disabled");

  targetButton.innerText = "Ulož svůj nový recept";
}

//Posts new recipe to supabase
console.log("TODO");
async function postRecipe() {
  buttonSpinner();

  let titleToPost = localStorage.getItem("title");

  // let titleToPost = document.querySelector(".addTitleInput").value;

  // let ingredientsToPost = document
  //   .querySelector(".addedIngredientsList")
  //   .querySelectorAll("li");

  // let arrayOfIngredients = extractValuesFromList(ingredientsToPost, "input");

  // let stepsToPost = document
  //   .querySelector(".addedStepsList")
  //   .querySelectorAll("li");

  // let arrayOfSteps = extractValuesFromList(stepsToPost, "textarea");

  let category = selectFormValue(document.querySelector(".selectCategoryForm"));

  let time = selectFormValue(document.querySelector(".selectTimeForm"));

  // if (
  // titleToPost !== null &&
  //   ingredientsToPost.length === arrayOfIngredients.length &&
  //   stepsToPost.length === arrayOfSteps.length &&
  //   category !== null &&
  //   time !== null
  // ) {
  //   try {
  //     const { error } = await insertRow(
  //       titleToPost,
  //       arrayOfIngredients,
  //       arrayOfSteps,
  //       category,
  //       time
  //     );

  //     if (error !== null) {
  //       console.error("Error inserting recipe:", error);
  //       showToast("error", "Něco se pokazilo, zkus to prosím znovu.");
  //     } else {
  //       console.log("Recipe added successfully!");
  //       showToast(
  //         "success",
  //         "Nový recept je na světě! Teď už jen sehnat někoho, kdo to uvaří."
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //     showToast("error", "Něco se pokazilo, zkus to prosím znovu.");
  //   }
  // } else {
  //   showToast("missing", "Vyplň prosím všechna pole.");
  // }

  buttonReset();
}

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
let title = document.querySelector(".addTitleInput");
title.addEventListener("change", () => {
  addTitleToLocalStorage();
});

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
