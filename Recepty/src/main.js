import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

import { fetchData, fetchFilteredData } from "./utils";

//Functions//
////////////

//Function, taht will display all recipes on the main page
function displayRecipes(recipesData) {
  const recipesPlaceHolder = document.querySelector(".recipesList");

  recipesData.forEach((recipe) => {
    if (recipe.is_sub_recipe === false) {
      let newRecipe = document.createElement("div");
      newRecipe.classList.add("recipe", "col");

      let badges = displayBadges(recipe);

      newRecipe.innerHTML = `
          <a href="http://localhost:5173/detail.html?id=${recipe.id}">
            <img src="./src/recipes_imgs/recipe_${recipe.id}.webp" class="card-img-top" alt="${recipe.title}" >
          </a>
                
          <div class="card-body">

          <a href="http://localhost:5173/detail.html?id=${recipe.id}" class="recipeNameLink">
            <h5 class="recipeName" class="card-title">
              ${recipe.title}
            </h5>
          </a>

          ${badges}

          <a id="${recipe.id}" href="http://localhost:5173/detail.html?id=${recipe.id}" class="btn btn-primary explodingBtn">Mrkni na recept!</a>

          </div>

        `;

      recipesPlaceHolder.appendChild(newRecipe);

      let img = newRecipe.querySelector("img");
      img.addEventListener("error", (event) => {
        img.src = "./src/recipes_imgs/default.webp";
      });
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
    badges += `<span class="badge rounded-pill infoBadge">${recipe.category}</span>`;
  }

  if (recipe.sub_category !== null) {
    badges += `<span class="badge rounded-pill infoBadge">${recipe.sub_category}</span>`;
  }

  if (recipe.special_category !== null) {
    badges += `<span class="badge rounded-pill infoBadge">${recipe.special_category}</span>`;
  }

  if (recipe.time !== null) {
    badges += `<span class="badge rounded-pill infoBadge">${recipe.time}</span>`;
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
    event.preventDefault();

    cleanRecipesList();

    if (input.value === "") {
      recipesData = await fetchData();
      displayRecipes(recipesData);
    } else if (input.value !== "") {
      recipesData = await fetchFilteredData(input.value);
      displayRecipes(recipesData);
    }
  });

  input.addEventListener("input", async (event) => {
    //display all recipes after using cross in input
    if (event.target.value === "") {
      cleanRecipesList();
      recipesData = await fetchData();
      displayRecipes(recipesData);
    }
  });
}

//function clean inner html of recipes list
function cleanRecipesList() {
  const recipesPlaceHolder = document.querySelector(".recipesList");
  recipesPlaceHolder.innerHTML = ``;
}

//////////////////
//Main Program //
/////////////////

let recipesData = await fetchData();

displayRecipes(recipesData);

handleSearch();
