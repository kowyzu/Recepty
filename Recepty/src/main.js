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

              <div class="infoBadges">
                <span class="badge rounded-pill text-bg-info">category</span>
                <span class="badge rounded-pill text-bg-info">time</span>
                <span class="badge rounded-pill text-bg-info">degrees</span>
                <span class="badge rounded-pill text-bg-info">sub_category</span>
                <span class="badge rounded-pill text-bg-info">special_category</span>
              </div>

          <a id="${recipe.id}" href="http://localhost:5173/detail.html?id=${recipe.id}" class="btn btn-primary explodingBtn">Mrkni na recept!</a>

          </div>

        `;

      recipesPlaceHolder.appendChild(newRecipe);
    }
  });
}

// async function displayInfoBadges(recipesData) {
//   const badgesPlaceHolders = document.querySelectorAll(".infoBadges");
//   console.log(badgesPlaceHolders);

//   badgesPlaceHolders.forEach((badgesPlaceHolder) => {
//     console.log(badgesPlaceHolder);
//     recipesData.forEach((recipe) => {
//       let newBadge = document.createElement("span");
//       newBadge.innerText = "hello";
//       badgesPlaceHolder.appendChild(newBadge)
//     });
//   });
// }

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

// await displayInfoBadges(recipesData);

// await clickExplosion();
