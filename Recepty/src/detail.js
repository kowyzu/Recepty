console.log("hello from JS detail");
import { fetchData } from "./utils";

async function displayRecipeDetail(recipesData, id) {
  const introPlaceHolder = document.querySelector(".mainHeader");
  const ingredientsPlaceHolder = document.querySelector(".ingredientList");
  const stepsPlaceHolder = document.querySelector(".stepList");
  let checkboxId = 0;

  recipesData.forEach((recipe) => {
    if (recipe.id === id) {
      let newIntro = document.createElement("div");
      newIntro.innerHTML = `
        <h1 class="detailTitle">${recipe.title}</h1>
        <img class="detailImg" src="./src/recipes_imgs/recipe_${recipe.id}.webp" alt="${recipe.titel}">
      `;
      newIntro.classList.add("detailIntro");

      introPlaceHolder.appendChild(newIntro);

      let recipeIngredients = recipe.ingredients;
      let recipeSteps = recipe.preparation_process;

      recipeIngredients.forEach((ingredient) => {
        if (typeof ingredient === "string") {
          let newIngredient = document.createElement("li");

          checkboxId = checkboxId + 1;

          newIngredient.innerHTML = `
                        <input class="form-check-input me-1" type="checkbox" value="" id="${checkboxId}CheckboxStretched">
                        <label class="form-check-label stretched-link" for="${checkboxId}CheckboxStretched">${ingredient}</label>
                    `;

          newIngredient.classList.add("list-group-item");
          newIngredient.classList.add("ingredient");

          ingredientsPlaceHolder.appendChild(newIngredient);
        }
      });

      recipeSteps.forEach((step) => {
        let newStep = document.createElement("li");

        newStep.innerHTML = `
          ${step}
        `;

        newStep.classList.add("list-group-item");

        stepsPlaceHolder.appendChild(newStep);
      });
    }
  });
}
//////////////////
//Main Programm //
/////////////////

let recipesData = await fetchData();

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
let myParam = urlParams.get("id");
myParam = Number(myParam);
console.log(myParam);

await displayRecipeDetail(recipesData, myParam);
