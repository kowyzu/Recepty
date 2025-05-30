import { createClient } from "@supabase/supabase-js";

// Access environment variable

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchData() {
  const { data, error } = await supabase.from("Recipes").select();

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  recipesData = data;
  return recipesData;
}

export async function fetchFilteredData(search) {
  const { data, error } = await supabase
    .from("Recipes")
    .select()
    .or(`title.ilike.%${search}%,category.ilike.%${search}%`);

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  recipesData = data;
  return recipesData;
}

//TODO: dokoncit tuto funkci, musim tam pridat povinna pole, zatim jsem je zvolila pouze nahodne

export async function insertRow(
  recipeTitle,
  listOfIngredients,
  listOfSteps,
  category,
  time
) {
  const { data, error } = await supabase
    .from("Recipes")
    .insert([
      {
        title: recipeTitle,
        ingredients: listOfIngredients,
        preparation_process: listOfSteps,
        is_sub_recipe: "false",
        category: category,
        time: time,
      },
    ])
    .select();

  return { data, error };

  // if (error !== null) {
  //   const toastError = document.getElementById("toastError");

  //   const toastBootstrapError = bootstrap.Toast.getOrCreateInstance(toastError);

  //   toastBootstrapError.show();
  // } else {
  //   const toastSuccess = document.getElementById("toastSuccess");

  //   const toastBootstrapSuccess =
  //     bootstrap.Toast.getOrCreateInstance(toastSuccess);

  //   toastBootstrapSuccess.show();
  // }
}

//////////////////////
////Main Programm////
////////////////////
let recipesData = [];
let recipesFilteredData = [];
