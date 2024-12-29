console.log("hello from JS detail");
import { fetchData } from "./utils";

async function displayRecipeIngredients(recipesData, id) {
  console.log(recipesData);
  const ingredientsPlaceHolder = document.querySelector(".ingredientList");
  console.log(ingredientsPlaceHolder);
  let checkboxId = 0;

  recipesData.forEach((recipe) => {
    if (recipe.id === id) {
      console.log(recipe.title);
      let recipeIngredients = recipe.ingredients;
      console.log(recipeIngredients);

      recipeIngredients.forEach((ingredient) => {
        let newIngredient = document.createElement("li");
        //   console.log(recipe.id);

        checkboxId = checkboxId + 1;
        //   console.log(checkboxId);

        newIngredient.innerHTML = `
        <input class="form-check-input me-1" type="checkbox" value="" id="${checkboxId}CheckboxStretched">
        <label class="form-check-label stretched-link" for="${checkboxId}CheckboxStretched">${ingredient}</label>
      `;

        newIngredient.classList.add("list-group-item");
        newIngredient.classList.add("ingredient");

        ingredientsPlaceHolder.appendChild(newIngredient);
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

await displayRecipeIngredients(recipesData, myParam);
