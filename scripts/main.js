// Entry Point and Event Listeners

import { initializeRecipes, getRecipes, saveRecipes } from "./storage.js";
import { renderRecipeList, renderAddRecipeForm } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize localStorage with starter data
  initializeRecipes();

  // Fetch all recipes and render grid
  let allRecipes = getRecipes();
  // console.log("Recipes to render:", allRecipes);

  renderRecipeList(allRecipes);
});


const addRecipeFormBtn = document.getElementById("btnAddRecipe");

addRecipeFormBtn.addEventListener('click', () => {
  renderAddRecipeForm(function (newRecipe) {
    const recipes = getRecipes();
    // console.log(recipes);
    recipes.push(newRecipe);
    saveRecipes(recipes);
    renderRecipeList(recipes);

    // Close form
    document.getElementById("recipeForm").classList.add("hidden");
  })
})
