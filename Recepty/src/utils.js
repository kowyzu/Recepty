import { createClient } from "@supabase/supabase-js";

// Access environment variables
const supabaseUrl = "https://bandgkogwpfcbuprjlce.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbmRna29nd3BmY2J1cHJqbGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMjYwODYsImV4cCI6MjA1MDgwMjA4Nn0.NLMW8IxkZ2q88PpCRcwJtmh6gRm-JxRrhF8iTxrCGVo";

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchData() {
  const { data, error } = await supabase.from("Recipes").select();

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  console.log("Fetched data:", data);
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

  console.log("Fetched data:", data);
  recipesData = data;
  return recipesData;
}

//TODO: dokoncit tuto funkci, musim tam pridat povinna pole, zatim jsem je zvolila pouze nahodne

export async function insertRow(recipeTitle) {
  const { data, error } = await supabase
    .from("Recipes")
    .insert([
      { title: recipeTitle, ingredients: "nic", is_sub_recipe: "false" },
    ]);
}

//////////////////////
////Main Programm////
////////////////////
let recipesData = [];
let recipesFilteredData = [];
