// UI rendering / manipulation functions

function clearElement(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

export function renderRecipeList(recipes) {
    const container = document.getElementById("recipeList");
    clearElement(container);

    if (recipes.length === 0) {
        const noRecipes = document.createElement("p");
        noRecipes.textContent = "No recipes found.";
        container.appendChild(noRecipes);
        return;
    }

    // Create grid and add cards
    for (const recipe of recipes) {
        const card = createRecipeCard(recipe);
        container.appendChild(card);
    }
}