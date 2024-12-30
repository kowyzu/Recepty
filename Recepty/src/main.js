console.log("hello from JS");

import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

import { fetchData } from "./utils";

//Functions//
////////////

async function displayRecipes(recipesData) {
  const recipesPlaceHolder = document.querySelector(".recipesList");
  recipesData.forEach((recipe) => {
    if (recipe.is_sub_recipe === false) {
      let newRecipe = document.createElement("div");
      newRecipe.classList.add("recipe");

      newRecipe.innerHTML = `
          <img src="./src/recipes_imgs/recipe_${recipe.id}.webp" class="card-img-top" alt="${recipe.title}">
                
          <div class="card-body">

            <h5 class="recipeName" class="card-title">
              ${recipe.title}
            </h5>

              <div class="recipeDetails">

                <p class="recipeCategory">
                  ${recipe.category}
                </p>

                <p class="recipeTime">
                  ${recipe.time} 
                </p>


              </div>

          <a id="${recipe.id}" href="http://localhost:5173/detail.html?id=${recipe.id}" class="btn btn-primary explodingBtn">Mrkni na recept!</a>

          </div>

        `;
      console.log(newRecipe);

      recipesPlaceHolder.appendChild(newRecipe);
    }
  });
}

async function clickExplosion() {
  const explodingButtons = document.querySelectorAll(".explodingBtn");

  explodingButtons.forEach((explodingButton) => {
    console.log(explodingButton);

    let explodingButtonId = explodingButton.getAttribute("id");
    console.log(explodingButtonId);

    explodingButton.addEventListener("click", (event) => {
      event.preventDefault();

      jsConfetti.addConfetti({
        emojis: ["🥘", "🥦", "🍩", "🍗", "🧁", "🍪"],
      });
      setTimeout(() => {
        window.location.href = `detail.html?id=${explodingButtonId}`;
      }, 1200);
    });
  });
}

//////////////////
//Main Programm //
/////////////////

let recipesData = await fetchData();

console.log(recipesData);

await displayRecipes(recipesData);

// await clickExplosion();
