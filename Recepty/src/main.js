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
  receiptsData = data;
}

//////////////////
//Main Programm //
/////////////////

let receiptsData = [];
await fetchData();

console.log(receiptsData);
