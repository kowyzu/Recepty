console.log("hello from JS");

import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

import { fetchData } from "./utils";

//Functions//
////////////

//Function, taht will display all recipes on the main page
function displayRecipes(recipesData) {
  const recipesPlaceHolder = document.querySelector(".recipesList");

  recipesData.forEach((recipe) => {
    if (recipe.is_sub_recipe === false) {
      let newRecipe = document.createElement("div");
      newRecipe.classList.add("recipe");

      let badges = displayBadges(recipe);

      newRecipe.innerHTML = `
          <img src="./src/recipes_imgs/recipe_${recipe.id}.webp" class="card-img-top" alt="${recipe.title}">
                
          <div class="card-body">

          <h5 class="recipeName" class="card-title">
            ${recipe.title}
          </h5>

          ${badges}

          <a id="${recipe.id}" href="http://localhost:5173/detail.html?id=${recipe.id}" class="btn btn-primary explodingBtn">Mrkni na recept!</a>

          </div>

        `;

      recipesPlaceHolder.appendChild(newRecipe);
    }
  });
}

//Function that will return badges
function displayBadges(recipe) {
  let badges = "";

  badges += `

    <div class="infoBadges">

  `;
  if (recipe.category !== null) {
    badges += `<span class="badge rounded-pill text-bg-info">${recipe.category}</span>`;
  }

  if (recipe.sub_category !== null) {
    badges += `<span class="badge rounded-pill text-bg-info">${recipe.sub_category}</span>`;
  }

  if (recipe.special_category !== null) {
    badges += `<span class="badge rounded-pill text-bg-info">${recipe.special_category}</span>`;
  }

  if (recipe.time !== null) {
    badges += `<span class="badge rounded-pill text-bg-info">${recipe.time}</span>`;
  }

  if (recipe.degrees !== null) {
    badges += `<span class="badge rounded-pill text-bg-info">${recipe.degrees}</span>`;
  }

  badges += `

    </div>

  `;

  return badges;
}

//Function that will handle search
function handleSearch() {
  let searchForm = document.querySelector(".searchForm");
  let input = document.querySelector(".searchInput");

  searchForm.addEventListener("submit", async (event) => {
    console.log(event);
    event.preventDefault();

    cleanRecipesList();

    if (input.value === "") {
      recipesData = await fetchData(null);
      displayRecipes(recipesData);
    } else if (input.value !== "") {
      console.log("je tam neco");
      recipesData = await fetchData(input.value);
      displayRecipes(recipesData);
      console.log(recipesData);
    }
  });

  input.addEventListener("click", async (event) => {
    console.log(event);

    if (input.value === "") {
      cleanRecipesList();
      recipesData = await fetchData(null);
      displayRecipes(recipesData);
    }
  });
}

//function clean inner html of recipes list
function cleanRecipesList() {
  const recipesPlaceHolder = document.querySelector(".recipesList");
  recipesPlaceHolder.innerHTML = ``;
}

//Function that will make emojis explode after the click on link a than redirects user to the link//

// async function clickExplosion() {
//   const explodingButtons = document.querySelectorAll(".explodingBtn");

//   explodingButtons.forEach((explodingButton) => {
//     console.log(explodingButton);

//     let explodingButtonId = explodingButton.getAttribute("id");
//     console.log(explodingButtonId);

//     explodingButton.addEventListener("click", (event) => {
//       event.preventDefault();

//       jsConfetti.addConfetti({
//         emojis: ["🥘", "🥦", "🍩", "🍗", "🧁", "🍪"],
//       });
//       setTimeout(() => {
//         window.location.href = `detail.html?id=${explodingButtonId}`;
//       }, 1200);
//     });
//   });
// }

//////////////////
//Main Programm //
/////////////////

let recipesData = await fetchData(null);

console.log(recipesData);

displayRecipes(recipesData);

handleSearch();

// await displayInfoBadges(recipesData);

// await clickExplosion();
