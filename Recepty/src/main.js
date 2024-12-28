console.log("hello from JS");

import { createClient } from "@supabase/supabase-js";

// Access environment variables
const supabaseUrl = "https://bandgkogwpfcbuprjlce.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbmRna29nd3BmY2J1cHJqbGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMjYwODYsImV4cCI6MjA1MDgwMjA4Nn0.NLMW8IxkZ2q88PpCRcwJtmh6gRm-JxRrhF8iTxrCGVo";

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

//Functions//
////////////
async function fetchData() {
  const { data, error } = await supabase.from("Receipts").select();

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  console.log("Fetched data:", data);
  recipesData = data;
}

function displayReceipt(recipesData) {
  const recipesPlaceHolder = document.querySelector(".recipesList");
  console.log(recipesPlaceHolder);

  recipesData.forEach((recipe) => {
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

        <a href="#" class="btn btn-primary">Go somewhere</a>

      </div>

    `;
    console.log(newRecipe);
    recipesPlaceHolder.appendChild(newRecipe);
  });
}

//////////////////
//Main Programm //
/////////////////

let recipesData = [];
await fetchData();

console.log(recipesData);

displayReceipt(recipesData);
