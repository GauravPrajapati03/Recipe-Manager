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


// Recipe Form UI

export function renderAddRecipeForm(onSubmit) {
    const formContainer = document.getElementById('recipeForm');
    // console.log(formContainer);

    formContainer.innerHTML = `
    <form id="addRecipeForm" class="add-recipe-form">
        <h2>Add New Recipe</h2>

        <label for="title">
        Title*
        <input type="text" id="title" name="title" required>
        </label>
        
        <label for="description">Description*
        <textarea id="description" name="description" required></textarea>
        </label>
        
        <label for="ingredients">Ingredients* (comma separated)
        <input type="text" id="ingredients" name="ingredients" required>
        </label>
        
        <label for="steps">Steps*
        <textarea id="steps" name="steps" required></textarea>
        </label>
        
        <label for="prepTime">Prep Time (in minutes)*
        <input type="number" min="0" id="prepTime" name="prepTime" required>
        </label>
        
        <label for="cookTime">Cook Time (in minutes)*
        <input type="number" min="0" id="cookTime" name="cookTime" required>
        </label>
        
        <label for="totalTime">Total Time (in minutes)*
        <input type="number" min="0" id="totalTime" name="totalTime" required>
        </label>
        
        <label for="difficulty">Difficulty*
        <select id="difficulty" name="difficulty" required>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
        </select>
        </label>
        
        <label for="imageURL">Image URL
        <input type="text" id="imageURL" name="imageURL">
        </label>
        
        <div >
            <button type="submit" id="addRecipeBtn">Add Recipe</button>
            <button type="button" id="cancelBtn">Cancel</button>
        </div>

    </form>
    `;

    formContainer.classList.remove('hidden');

    // Add Recipe Operation
    const form = document.getElementById('addRecipeForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = ({
            id: Date.now().toString(),
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            ingredients: document.getElementById('ingredients').value,
            steps: document.getElementById('steps').value,
            prepTime: document.getElementById('prepTime').value,
            cookTime: document.getElementById('cookTime').value,
            totalTime: document.getElementById('totalTime').value,
            difficulty: document.getElementById('difficulty').value,
            imageURL: document.getElementById('imageURL').value
        });
        console.log(formData);

        onSubmit(formData);

    })

    // Cancel Operation
    const cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.addEventListener('click', () => {
        formContainer.classList.add('hidden');
    })
}
