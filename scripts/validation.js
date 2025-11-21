// Input function validations

export function validateRecipeForm(data) {
    const errors = {};
    // Title
    if (!data.title || data.title.trim().length < 3) {
        errors.title = "Title must be at least 3 characters.";
    }
    // Description
    if (!data.description || data.description.trim().length < 10) {
        errors.description = "Description must be at least 10 characters.";
    }
    // Ingredients
    const ingredients = Array.isArray(data.ingredients)
        ? data.ingredients
        : data.ingredients.split(',').map(s => s.trim()).filter(Boolean);
    if (ingredients.length === 0) {
        errors.ingredients = "Please add at least one ingredient.";
    }
    // Steps
    const steps = Array.isArray(data.steps)
        ? data.steps
        : data.steps.split('\n').map(s => s.trim()).filter(Boolean);
    if (steps.length === 0) {
        errors.steps = "Please add at least one step.";
    }
    // Time
    if (!data.prepTime || isNaN(data.prepTime) || Number(data.prepTime) <= 0) {
        errors.prepTime = "Enter a positive prep time.";
    }
    if (!data.cookTime || isNaN(data.cookTime) || Number(data.cookTime) <= 0) {
        errors.cookTime = "Enter a positive cook time.";
    }
    if (!data.totalTime || isNaN(data.totalTime) || Number(data.totalTime) <= 0) {
        errors.totalTime = "Enter a positive total time.";
    }
    // Difficulty
    const difficulties = ["Easy", "Medium", "Hard"];
    if (!data.difficulty || !difficulties.includes(data.difficulty)) {
        errors.difficulty = "Invalid difficulty selected.";
    }
    // Image URL
    if (data.imageURL && data.imageURL.trim()) {
        // Only check if present
        try {
            new URL(data.imageURL);
        } catch {
            errors.imageURL = "Image URL must be valid (http/https).";
        }
    }

    return errors;
}