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

let idNumber = 2;

//function for adding new steps in form of textAreas
function addStep() {
  const stepPlaceHolder = document.querySelector(".addedStepsList");

  let newStepClass = "addedStep";

  let newStepId = "textArea-" + idNumber;

  let newStep = document.createElement("li");

  newStep.innerHTML = `
    <div class="input-group mb-3">
      <textarea name="addedStep" id="${newStepId}" class="form-control addedStepTextArea"></textarea>
      <button class="deleteButton btn btn-outline-secondary">X</button>
    </div>
  `;

  newStep.classList.add(newStepClass);

  stepPlaceHolder.appendChild(newStep);

  idNumber += 1;
}

// function that wil create new li elements with added values
// function addNewSmthing(addSmthingForm, input, placeHolder, newClass) {
//   addSmthingForm.addEventListener("submit", (event) => {
//     event.preventDefault();

//     console.log(input.value);

//     if (input.value) {
//       if (
//         addSmthingForm.className === "addTitle" &&
//         placeHolder.childElementCount === 1
//       ) {
//         alert(
//           "Název může mít jen jednu hodnotu. Co je moc, to je příliš - i v kuchyni!"
//         );
//       } else {
//         let newValue = document.createElement("li");

//         newValue.innerHTML = `
//         <span>${input.value}</span>
//         <button class="deleteButton">X</button>
//   `;

//         newValue.classList.add(newClass);

//         placeHolder.appendChild(newValue);

//         input.value = "";
//       }
//     }
//   });

//   if (input.nodeName === "TEXTAREA") {
//     addSmthingForm.addEventListener("keyup", (event) => {
//       if (event.key === "Enter") {
//         event.preventDefault;
//         addSmthingForm.requestSubmit();
//       }
//     });
//   }
// }

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

//function for letting user know that he needs to add some value
function valueWarning(shakeTarget, changeColorTarget, warningText) {
  // let warningText = document.querySelector(".valueWarning");

  shakeTarget.classList.add("animate__animated");
  shakeTarget.classList.add("animate__headShake");
  changeColorTarget.classList.add("missingValue");

  warningText.style.display = "block";

  setTimeout(() => {
    shakeTarget.classList.remove("animate__animated");
    shakeTarget.classList.remove("animate__headShake");
    changeColorTarget.classList.remove("missingValue");
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
let addIngredientButton = document.querySelector(".addIngredientButton");
let firstIngredientInput = document.querySelector("#input-1");
let firstIngredientLiElement = document.querySelector(".firstAddedIngredient");
let inputValueWarning = document.querySelector(".inputValueWarning");

addIngredientButton.addEventListener("click", (event) => {
  if (firstIngredientInput.value !== "") {
    addIngredient();
  } else {
    valueWarning(
      firstIngredientLiElement,
      firstIngredientInput,
      inputValueWarning
    );
  }
});

// add new ingredient input by enter
firstIngredientInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && event.target.value.trim() !== "") {
    event.preventDefault();
    addIngredient();
  } else if (event.key === "Enter") {
    let closestLiElement = event.target.closest("li");
    valueWarning(closestLiElement, firstIngredientInput, inputValueWarning);
  }
});

//delete specific ingredient input by specific delete button
let ingredientsUl = document.querySelector(".addedIngredientsList");
console.log("TODO add warning to html");

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

//!!!zkusit mozna pracovat jen s ol listem a poslednim elementem?
addStepButton.addEventListener("click", () => {
  let textAreaIdName = "#textArea-";
  let textAreaIdNumber = stepsOl.childElementCount;
  let textAreaId = textAreaIdName + textAreaIdNumber;
  let lastTextArea = document.querySelector(textAreaId);
  console.log(lastTextArea);
  let lastTextAreaParent = lastTextArea.parentElement;

  if (lastTextArea.value !== "") {
    addStep();
  } else {
    valueWarning(lastTextAreaParent, lastTextArea, stepValueWarning);
  }
});

// funguje, dokud nepouzivam mazani
// addStepButton.addEventListener("click", () => {
//   let textAreaIdName = "#textArea-";
//   let textAreaIdNumber = stepsOl.childElementCount;
//   let textAreaId = textAreaIdName + textAreaIdNumber;
//   let lastTextArea = document.querySelector(textAreaId);
//   console.log(lastTextArea);
//   let lastTextAreaParent = lastTextArea.parentElement;

//   if (lastTextArea.value !== "") {
//     addStep();
//   } else {
//     valueWarning(lastTextAreaParent, lastTextArea, stepValueWarning);
//   }
// });

//delete specific step textarea by specific delete button
console.log("TODO add warning to html");
stepsOl.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("deleteButton") &&
    stepsOl.childElementCount > 1
  ) {
    event.target.closest("li").remove();
  }
  // else if (event.target.classList.contains("deleteButton")) {
  //   let closestLiElement = event.target.closest("li");

  //   let closestInput = event.target
  //     .closest("li")
  //     .querySelector(".addedIngredientInput");
  //   valueWarning(closestLiElement, closestInput);
  // }
});

// let addStepForm = document.querySelector(".addStep");
// let stepTextArea = document.querySelector(".addStepTextArea");
// const stepPlaceHolder = document.querySelector(".addedStepsList");
// let newStepClass = "addedStep";

// addNewSmthing(addStepForm, stepTextArea, stepPlaceHolder, newStepClass);

let postButton = document.querySelector(".saveRecipeButton");

postButton.addEventListener("click", () => {
  postRecipe();
});
