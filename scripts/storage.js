// localStorage CRUD Operations

const Storage_Key = 'recipes';


export function getRecipes() {
    try {
        const data = localStorage.getItem(Storage_Key);
        return data ? JSON.parse(data) : [];
    } catch (err) {
        localStorage.removeItem(Storage_Key);
        return [];
    }
}


export function saveRecipes(recipes) {
    localStorage.setItem(Storage_Key, JSON.stringify(recipes));
}

export function initializeRecipes() {
    if (!localStorage.getItem(Storage_Key)) {
        const initializeRecipes = [
            {
                id: Date.now().toString(),
                title: "Classic Pancakes",
                description: "Fluffy and delicious pancakes to start your day.",
                ingredients: [
                    "2 cups all-purpose flour",
                    "2 large eggs",
                    "1.5 cups milk",
                    "1 tbsp sugar",
                    "1 tsp baking powder",
                    "Pinch of salt"
                ],
                steps: [
                    "Mix dry ingredients in a large bowl.",
                    "Whisk eggs and milk together.",
                    "Combine wet and dry ingredients gently.",
                    "Cook batter on a hot griddle until golden brown on both sides."
                ],
                prepTime: 10,
                cookTime: 5,
                totalTime: 15,
                difficulty: "Easy",
                imageURL: "https://cdn.dummyjson.com/recipe-images/3.webp",
                createdAt: new Date().toISOString()
            }
            // more recipes
        ];
        saveRecipes(initializeRecipes);
    }
}