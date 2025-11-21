// UI rendering / manipulation functions

import { validateRecipeForm } from './validation.js';

function clearElement(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export function renderRecipeList(recipes, onViewRecipe) {
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
    const card = createRecipeCard(recipe, onViewRecipe);
    container.appendChild(card);
  }
}

function createRecipeCard(recipe, onView) {
  const card = document.createElement("article");
  card.className = "recipe-card";
  card.setAttribute("tabindex", "0");
  card.innerHTML = `
    <img src="${recipe.imageURL || "https://via.placeholder.com/150"}" alt="Image of ${recipe.title}" class="recipe-card-image" loading="lazy" />
    <div class="recipe-card-content">
      <h3 class="recipe-card-title">${recipe.title}</h3>
      <p class="recipe-card-description">${recipe.description}</p>
      <p class="recipe-card-info">
        Difficulty: <span class="difficulty-badge difficulty-${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span> | Total Time: ${recipe.totalTime} min
      </p>
    </div>
  `;

  // Attach view click handler
  card.addEventListener("click", () => {
    if (typeof onView === "function") onView(recipe);
  });

  return card;
}



// Recipe Form UI

export function renderAddRecipeForm(onSubmit) {
  const formContainer = document.getElementById('recipeForm');
  const recipeListEl = document.getElementById('recipeList');

  // Render the form inside a centered overlay so it acts like a modal
  formContainer.innerHTML = `
    <div class="form-overlay" role="dialog" aria-modal="true">
      <form id="addRecipeForm" class="add-recipe-form">
          <div class="form-header">
            <h2>Add New Recipe</h2>
            <i class="ri-close-large-line close-form"></i>
          </div>
          <label for="title">
          Title*
          <input type="text" id="title" name="title" placeholder="recipe name" required>
          </label>
          
          <label for="description">Description*
          <textarea id="description" name="description" rows="3" placeholder="recipe description" required></textarea>
          </label>
          
          <label for="ingredients">Ingredients* (comma separated)
          <input type="text" id="ingredients" name="ingredients" placeholder="ingredients list" required>
          </label>
          
          <label for="steps">Steps* (enter each step on a new line)
          <textarea id="steps" name="steps" placeholder="recipe steps" rows="5" required></textarea>
          </label>
          
          <div class="time-inputs">
            <label for="prepTime">Prep Time (in minutes)*
            <input type="number" min="0" id="prepTime" name="prepTime" placeholder="e.g. 10 min" required>
            </label>

            <label for="cookTime">Cook Time (in minutes)*
            <input type="number" min="0" id="cookTime" name="cookTime" placeholder="e.g. 20 min" required>
            </label>

            <label for="totalTime">Total Time (in minutes)*
            <input type="number" min="0" id="totalTime" name="totalTime" placeholder="e.g. 30 min" required>
            </label>
          </div>
          
          <label for="difficulty">Difficulty*
          <select id="difficulty" name="difficulty" required>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
          </select>
          </label>
          
          <label for="imageURL">Image URL
          <input type="text" id="imageURL" name="imageURL" placeholder="https://example.com/image.jpg">
          </label>
          
          <div class="form-actions">
              <button type="submit" id="addRecipeBtn">Add Recipe</button>
              <button type="button" id="cancelBtn">Cancel</button>
          </div>

      </form>
    </div>
    `;

  // Show overlay and blur the grid
  formContainer.classList.remove('hidden');
  recipeListEl.classList.add('blurred');

  const overlay = formContainer.querySelector('.form-overlay');
  const form = document.getElementById('addRecipeForm');

  // Close helpers
  function closeForm() {
    formContainer.classList.add('hidden');
    recipeListEl.classList.remove('blurred');
    document.removeEventListener('keydown', escHandler);
  }

  // Submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    function clearErrors() {
      form.querySelectorAll('.form-error').forEach(n => n.remove());
      form.querySelectorAll('.input-error').forEach(n => n.classList.remove('input-error'));
    }

    // Always clear previous errors before validating again
    clearErrors();
    const formData = {
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
    };

    const errors = validateRecipeForm(formData);
    if (Object.keys(errors).length > 0) {
      // Show errors inline; highlight fields. Try by id first, then by name.
      Object.entries(errors).forEach(([field, msg]) => {
        let el = form.querySelector(`#${field}`) || form.querySelector(`[name="${field}"]`);
        if (el) {
          el.classList.add('input-error');
          let err = document.createElement('div');
          err.className = 'form-error';
          err.innerText = msg;
          // Insert error immediately after the field element
          if (el.parentNode) el.parentNode.insertBefore(err, el.nextSibling);
        }
      });
      return; // Prevent form submission if errors
    }

    onSubmit(formData);
    // close modal after submit
    closeForm();
  });

  // Cancel button
  const close = document.querySelector('.close-form');
  close.addEventListener('click', () => closeForm());
  const cancelBtn = document.getElementById('cancelBtn');
  cancelBtn.addEventListener('click', () => closeForm());

  // Close when clicking outside the form
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeForm();
  });

  // Escape key closes form
  function escHandler(e) {
    if (e.key === 'Escape') closeForm();
  }
  document.addEventListener('keydown', escHandler);
}


// Recipe Detail UI
export function renderRecipeDetail(recipe, { onEdit, onDelete, onClose }) {
  const detailContainer = document.getElementById("recipeDetail");
  // Put the detail inside a full-screen overlay so it appears centered,
  // and blur / disable the recipe grid while open.
  const recipeListEl = document.getElementById("recipeList");

  detailContainer.innerHTML = `
    <div class="modal-overlay" role="dialog" aria-modal="true">
      <div class="recipe-detail">
        <i class="ri-close-large-line close-detail"></i>
        <img src="${recipe.imageURL || "https://via.placeholder.com/150"}" alt="Image of ${recipe.title}" class="recipe-detail-image" loading="lazy" />
        <h2>${recipe.title}</h2>
        <p class="recipe-detail-desc">${recipe.description}</p>
        <div class="recipe-detail-meta">
          <span><b>Difficulty:</b> ${recipe.difficulty}</span>
          <span><b>Prep Time:</b> ${recipe.prepTime} min</span>
          <span><b>Cook Time:</b> ${recipe.cookTime} min</span>
          <span><b>Total Time:</b> ${recipe.totalTime} min</span>
        </div>
        <div>
          <h3 class="section-title">Ingredients</h3>
          <ul class="recipe-detail-ingredients">
            ${(Array.isArray(recipe.ingredients) ? recipe.ingredients : String(recipe.ingredients).split(',')).map(i => `<li>${i}</li>`).join('')}
          </ul>
          <h3 class="section-title">Steps</h3>
          <ol class="recipe-detail-steps">
            ${(Array.isArray(recipe.steps) ? recipe.steps : String(recipe.steps).split('\n')).map(s => `<li>${s}</li>`).join('')}
          </ol>
        </div>
        <div class="recipe-detail-actions">
          <button id="editRecipeBtn">Edit</button>
          <button id="deleteRecipeBtn">Delete</button>
          <button id="closeDetailBtn">Close</button>
        </div>
      </div>
    </div>
  `;

  // Show overlay and blur/disable the grid
  detailContainer.classList.remove("hidden");
  recipeListEl.classList.add("blurred");

  const overlay = detailContainer.querySelector('.modal-overlay');

  // Function to close and cleanup
  function closeDetail(triggerOnClose = true) {
    detailContainer.classList.add('hidden');
    recipeListEl.classList.remove('blurred');
    if (triggerOnClose && typeof onClose === 'function') onClose();
    document.removeEventListener('keydown', escHandler);
  }

  // Close when clicking outside the card (on the overlay)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDetail();
  });

  // Close on Escape key
  function escHandler(e) {
    if (e.key === 'Escape') closeDetail();
  }
  document.addEventListener('keydown', escHandler);

  // Wire up buttons
  const close = detailContainer.querySelector('.close-detail');
  const closeBtn = detailContainer.querySelector('#closeDetailBtn');
  const editBtn = detailContainer.querySelector('#editRecipeBtn');
  const deleteBtn = detailContainer.querySelector('#deleteRecipeBtn');

  close.onclick = () => closeDetail();
  closeBtn.onclick = () => closeDetail();
  editBtn.onclick = () => {
    console.log(`Edit button Clicked`);
    if (onEdit) onEdit(recipe);
  };
  deleteBtn.onclick = () => {
    const confirmed = confirm(
      `Are you sure you want to delete the recipe "${recipe.title}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }
    // User confirmed → proceed with deletion
    if (onDelete) onDelete(recipe);
    closeDetail(false);
  };
}



// Edit Form UI
export function renderEditRecipeForm(recipe, onsubmit) {
  const formContainer = document.getElementById('recipeForm');
  const recipeListEl = document.getElementById('recipeList');

  formContainer.innerHTML = `
    <div class="form-overlay" role="dialog" aria-modal="true">
      <form id="editRecipeForm" class="add-recipe-form">
        <div class="form-header">
          <h2>Edit Recipe</h2>
          <i class="ri-close-large-line close-form"></i>
        </div>
        <label>Title* <input type="text" name="title" required value="${recipe.title}" /></label>
        <label>Description* <textarea name="description" rows="3" required>${recipe.description}</textarea></label>
        <label>Ingredients* (comma separated) <input type="text" name="ingredients" required value="${Array.isArray(recipe.ingredients) ? recipe.ingredients.join(',') : recipe.ingredients}" /></label>
        <label>Steps* <textarea name="steps" rows="5" required>${Array.isArray(recipe.steps) ? recipe.steps.join('\n') : recipe.steps}</textarea></label>
        <div class="time-inputs">
          <label>Prep Time* <input type="number" name="prepTime" min="0" required value="${recipe.prepTime}" /></label>
          <label>Cook Time* <input type="number" name="cookTime" min="0" required value="${recipe.cookTime}" /></label>
          <label>Total Time* <input type="number" name="totalTime" min="0" required value="${recipe.totalTime}" /></label>
        </div>
        <label>Difficulty* <select name="difficulty" required>
          <option value="Easy" ${recipe.difficulty === "Easy" ? "selected" : ""}>Easy</option>
          <option value="Medium" ${recipe.difficulty === "Medium" ? "selected" : ""}>Medium</option>
          <option value="Hard" ${recipe.difficulty === "Hard" ? "selected" : ""}>Hard</option>
        </select></label>
        <label>Image URL <input type="text" name="imageURL" value="${recipe.imageURL || ''}" /></label>
        <div class="form-actions">
          <button type="submit">Save</button>
          <button type="button" id="cancelEditBtn">Cancel</button>
        </div>
      </form>
    </div>
  `;

  // show overlay and blur grid
  formContainer.classList.remove('hidden');
  recipeListEl.classList.add('blurred');
  document.getElementById('recipeDetail').classList.add('hidden');

  const overlay = formContainer.querySelector('.form-overlay');
  const form = document.getElementById('editRecipeForm');

  function closeForm() {
    formContainer.classList.add('hidden');
    recipeListEl.classList.remove('blurred');
    document.removeEventListener('keydown', escHandler);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors first
    function clearEditErrors() {
      form.querySelectorAll('.form-error').forEach(n => n.remove());
      form.querySelectorAll('.input-error').forEach(n => n.classList.remove('input-error'));
    }
    clearEditErrors();

    const formData = new FormData(form);
    const updatedRecipe = {
      ...recipe,
      title: formData.get('title'),
      description: formData.get('description'),
      ingredients: formData.get('ingredients'),
      steps: formData.get('steps'),
      prepTime: formData.get('prepTime'),
      cookTime: formData.get('cookTime'),
      totalTime: formData.get('totalTime'),
      difficulty: formData.get('difficulty'),
      imageURL: formData.get('imageURL')
    };

    // Validate before submitting
    const errors = validateRecipeForm(updatedRecipe);
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, msg]) => {
        let el = form.querySelector(`#${field}`) || form.querySelector(`[name="${field}"]`);
        if (el) {
          el.classList.add('input-error');
          let err = document.createElement('div');
          err.className = 'form-error';
          err.innerText = msg;
          if (el.parentNode) el.parentNode.insertBefore(err, el.nextSibling);
        }
      });
      return;
    }

    onsubmit(updatedRecipe);
    closeForm();
  });

  const closeIcon = formContainer.querySelector('.close-form');
  if (closeIcon) closeIcon.addEventListener('click', () => closeForm());

  const cancelBtn = document.getElementById('cancelEditBtn');
  cancelBtn.addEventListener('click', () => closeForm());

  function escHandler(e) {
    if (e.key === 'Escape') closeForm();
  }
  document.addEventListener('keydown', escHandler);

}