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

function createRecipeCard(recipe) {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.setAttribute("tabindex", "0");

    card.innerHTML = `
    <img src="${recipe.imageURL || "https://via.placeholder.com/150"}" alt="Image of ${recipe.title}" class="recipe-card-image" lazy="loading" />
    <div class="recipe-card-content">
        <h3 class="recipe-card-title">${recipe.title}</h3>
        <p class="recipe-card-description">${recipe.description}</p>
        <p class="recipe-card-info">
            Difficulty: <span class="difficulty-badge difficulty-${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span> | Total Time: ${recipe.totalTime} min
        </p>
    </div>
  `;

    return card;
}