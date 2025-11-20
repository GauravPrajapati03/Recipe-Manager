// Entry Point and Event Listeners

import { initializeRecipes } from "./storage.js";
import { renderRecipeList } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize localStorage with starter data
  initializeRecipes();

  // Fetch all recipes and render grid
  let allRecipes = getRecipes();
  renderRecipeList(allRecipes);
});