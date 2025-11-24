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

    // Servings
    if (!data.servings || isNaN(data.servings) || Number(data.servings) < 1) {
        errors.servings = "Please enter the number of servings (min 1).";
    }

    // Cuisine (optional: max 32 chars, no numbers)
    if (data.cuisine && data.cuisine.trim()) {
        if (data.cuisine.length > 32) {
            errors.cuisine = "Cuisine must be less than 32 characters.";
        }
        if (/\d/.test(data.cuisine)) {
            errors.cuisine = "Cuisine should not contain numbers.";
        }
    }

    // Tags (optional but if present, at least 1 tag, each max 18 chars)
    let tags = [];
    if (Array.isArray(data.tags)) {
        tags = data.tags.map(s => s.trim()).filter(Boolean);
    } else if (typeof data.tags === "string") {
        tags = data.tags.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (data.tags && tags.length === 0) {
        errors.tags = "If you add tags, please provide at least one tag.";
    }
    if (tags.some(tag => tag.length > 18)) {
        errors.tags = "Each tag must be less than 18 characters.";
    }

    // Notes (optional: max 500 chars)
    if (data.notes && data.notes.length > 500) {
        errors.notes = "Notes must be less than 500 characters.";
    }

    // Times (require all 3 for consistency; if UI logic allows just totalTime, adjust here)
    if (!data.prepTime || isNaN(data.prepTime) || Number(data.prepTime) < 0) {
        errors.prepTime = "Enter a valid (0 or positive) prep time.";
    }
    if (!data.cookTime || isNaN(data.cookTime) || Number(data.cookTime) < 0) {
        errors.cookTime = "Enter a valid (0 or positive) cook time.";
    }
    if (!data.totalTime || isNaN(data.totalTime) || Number(data.totalTime) <= 0) {
        errors.totalTime = "Enter a positive total time.";
    } else {
        // Optional: consistency check (if totalTime < prep+cook, warn user)
        const totalTime = Number(data.totalTime);
        const p = Number(data.prepTime);
        const c = Number(data.cookTime);
        if (p >= 0 && c >= 0 && totalTime < p + c) {
            errors.totalTime = "Total time should be at least prep + cook time.";
        }
    }

    // Difficulty
    const difficulties = ["Easy", "Medium", "Hard"];
    if (!data.difficulty || !difficulties.includes(data.difficulty)) {
        errors.difficulty = "Invalid difficulty selected.";
    }

    // Image URL (optional, but if given must be valid)
    if (data.imageURL && data.imageURL.trim()) {
        try {
            new URL(data.imageURL);
        } catch {
            errors.imageURL = "Image URL must be a valid link (http/https).";
        }
    }

    return errors;
};
