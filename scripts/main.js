// Entry Point and Event Listeners

import { initializeRecipes, getRecipes, saveRecipes } from "./storage.js";
import { renderRecipeList, renderAddRecipeForm, renderRecipeDetail, renderEditRecipeForm } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize localStorage with starter data
  initializeRecipes();

  // Fetch all recipes and render grid
  let allRecipes = getRecipes();
  let currentRecipes = [...allRecipes]; // Track current grid state (filtered/search)

  function showRecipeList() {
    renderRecipeList(currentRecipes, onViewRecipe);
  }

  function onViewRecipe(recipe) {
    renderRecipeDetail(recipe, {
      onEdit: () => {
        renderEditRecipeForm(recipe, onUpdateRecipe);
      },
      onDelete: (r) => {
        // Remove from both allRecipes and currentRecipes
        allRecipes = allRecipes.filter(rec => rec.id !== r.id);
        currentRecipes = currentRecipes.filter(rec => rec.id !== r.id);
        saveRecipes(allRecipes);
        document.getElementById("recipeDetail").classList.add("hidden");
        showRecipeList();
      },
      onClose: showRecipeList
    });
  }

  // Initial render
  renderRecipeList(currentRecipes, onViewRecipe);

  const addRecipeFormBtn = document.getElementById("btnAddRecipe");
  addRecipeFormBtn.addEventListener('click', () => {
    renderAddRecipeForm(handleAddRecipe);
  })

  function handleAddRecipe(newRecipe) {
    // Normalize ingredient/step values
    newRecipe.ingredients = typeof newRecipe.ingredients === 'string'
      ? newRecipe.ingredients.split(',').map(s => s.trim()).filter(Boolean)
      : newRecipe.ingredients;

    newRecipe.steps = typeof newRecipe.steps === 'string'
      ? newRecipe.steps.split('\n').map(s => s.trim()).filter(Boolean)
      : newRecipe.steps;

    // Add the recipe to your recipes array
    allRecipes.unshift(newRecipe);

    // If a filter/search is active, add to currentRecipes if it matches
    const searchTerm = searchInput.value.trim().toLowerCase();
    const diffValue = difficultyFilter.value;
    const matchesSearch = newRecipe.title.toLowerCase().includes(searchTerm);
    const matchesDifficulty = diffValue === "All" || newRecipe.difficulty === diffValue;
    if (matchesSearch && matchesDifficulty) {
      currentRecipes.unshift(newRecipe);
    }

    // Save to localStorage
    saveRecipes(allRecipes);

    // Update UI (always pass detail-view handler!)
    renderRecipeList(currentRecipes, onViewRecipe);
  }

  // Elements
  const searchInput = document.getElementById("inputSearch");
  const difficultyFilter = document.getElementById("filterDifficulty");
  const addRecipeBtn = document.getElementById("btnAddRecipe");

  // Search handler
  searchInput.addEventListener("input", () => {
    filterAndRender();
  });

  // Difficulty filter handler
  difficultyFilter.addEventListener("change", () => {
    filterAndRender();
  });

  // Applies search and filter on allRecipes and updates UI
  function filterAndRender() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const diffValue = difficultyFilter.value;

    currentRecipes = allRecipes.filter((recipe) => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm);
      const matchesDifficulty =
        diffValue === "All" || recipe.difficulty === diffValue;
      return matchesSearch && matchesDifficulty;
    });

    renderRecipeList(currentRecipes, onViewRecipe);
  }


  // update recipe handler
  function onUpdateRecipe(updatedRecipe) {
    
    // Normalize ingredient/step values
    updatedRecipe.ingredients = typeof updatedRecipe.ingredients === 'string'
      ? updatedRecipe.ingredients.split(',').map(s => s.trim()).filter(Boolean)
      : updatedRecipe.ingredients;

    updatedRecipe.steps = typeof updatedRecipe.steps === 'string'
      ? updatedRecipe.steps.split('\n').map(s => s.trim()).filter(Boolean)
      : updatedRecipe.steps;

    // Update original arrays
    const idx = allRecipes.findIndex(r => r.id === updatedRecipe.id);

    if (idx !== -1) {
      allRecipes[idx] = updatedRecipe;

      const currIdx = currentRecipes.findIndex(r => r.id === updatedRecipe.id);
      if (currIdx !== -1) currentRecipes[currIdx] = updatedRecipe;

      saveRecipes(allRecipes);

      document.getElementById("recipeForm").classList.add("hidden");

      renderRecipeDetail(updatedRecipe, {
        onEdit: () => {
          renderEditRecipeForm(updatedRecipe, onUpdateRecipe)
        },
        onDelete: (r) => {
          allRecipes = allRecipes.filter(rec => rec.id !== r.id);
          saveRecipes(allRecipes);
          document.getElementById("recipeDetail").classList.add("hidden");
          showRecipeList();
        },
        onClose: showRecipeList
      });

    }
  }



});
