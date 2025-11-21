// Entry Point and Event Listeners

import { initializeRecipes, getRecipes, saveRecipes } from "./storage.js";
import { renderRecipeList, renderAddRecipeForm, renderRecipeDetail } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize localStorage with starter data
  initializeRecipes();

  // Fetch all recipes and render grid
  let allRecipes = getRecipes();
  // console.log("Recipes to render:", allRecipes);

  renderRecipeList(allRecipes);

  function showRecipeList() {
    renderRecipeList(allRecipes, onViewRecipe);
  }


  function onViewRecipe(recipe) {
    renderRecipeDetail(recipe, {
      onEdit: (r) => { /* open edit form */ },
      onDelete: (r) => {
        allRecipes = allRecipes.filter(rec => rec.id !== r.id);
        saveRecipes(allRecipes);
        document.getElementById("recipeDetail").classList.add("hidden");
        showRecipeList();
      },
      onClose: showRecipeList
    });
  }

  showRecipeList();


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

});


