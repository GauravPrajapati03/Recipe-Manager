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
                "id": (Date.now()).toString(),
                "title": "Mutter Paneer",
                "description": "A classic North Indian curry of paneer and green peas simmered in a spiced tomato-onion gravy.",
                "ingredients": [
                    "Paneer – 200 g, cut into 1.5 cm cubes",
                    "Green peas – 100 g (fresh or frozen)",
                    "Onion – 1 small (100 g), finely chopped",
                    "Tomatoes – 200 g pureed (or canned puree)",
                    "Ginger paste – 1 tsp",
                    "Garlic paste – 1 tsp",
                    "Green chili – 1 slit (optional)",
                    "Oil – 2 tbsp (or 1 tbsp oil + 1 tbsp ghee)",
                    "Cumin seeds – 1/2 tsp",
                    "Turmeric – 1/4 tsp",
                    "Red chili powder – 3/4 tsp",
                    "Coriander powder – 1 tsp",
                    "Cumin powder – 1/2 tsp (optional)",
                    "Garam masala – 1/2 tsp",
                    "Kasuri methi – 1 tsp, crushed",
                    "Salt – 3/4 to 1 tsp (to taste)",
                    "Water – 150 ml",
                    "Fresh cream – 1 tbsp OR yogurt – 2 tbsp (optional)",
                    "Fresh cilantro – chopped, for garnish",
                    "Lemon wedges – optional"
                ],
                "steps": [
                    "Preheat a heavy-bottomed skillet on HIGH for 30 seconds. Add oil/ghee and immediately reduce flame to MEDIUM.",
                    "Add cumin seeds and let them sizzle on MEDIUM for 8–12 seconds.",
                    "Add chopped onions + pinch of salt. Sauté on MEDIUM for 7–9 minutes until light golden.",
                    "Add ginger paste, garlic paste, and slit chili. Sauté on MEDIUM for 40–50 seconds.",
                    "Add tomato puree. Briefly raise heat to MEDIUM-HIGH for 10–15 seconds, then reduce to MEDIUM-LOW.",
                    "Add turmeric, red chili powder, coriander powder, cumin powder (optional), and salt. Cook the masala on MEDIUM-LOW for 6–8 minutes until oil separates.",
                    "Add 150 ml water and bring to a gentle simmer on MEDIUM. Add peas and cook: fresh peas 6–7 min; frozen peas 4–5 min.",
                    "In a separate pan, heat 1 tbsp oil/ghee on MEDIUM-HIGH. Fry paneer 1.5–2 minutes per side until lightly golden (total 3–4 min). Remove to a plate.",
                    "Add fried paneer to the gravy. Simmer on LOW for 3–4 minutes so flavors absorb.",
                    "Add cream or whisked yogurt (optional). Mix gently on LOW.",
                    "Finish with garam masala and crushed kasuri methi. Turn off heat.",
                    "Cover and rest for 2 minutes, then garnish with cilantro and lemon."
                ],
                "prepTime": 12,
                "cookTime": 25,
                "totalTime": 37,
                "difficulty": "Medium",
                "imageURL": "https://www.simplyrecipes.com/thmb/dAFaT1RsQ_3itLIp_MIyk3MX82o=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Matar-Paneer-LEAD-05-c2487ab07101404d8ebfec4fd8582ca2.jpg",
                "createdAt": new Date().toISOString()
            },
            {
                id: (Date.now() + 1).toString(),
                title: "Vegetarian Stir-Fry",
                description: "A quick and healthy stir-fry with tofu and fresh vegetables.",
                ingredients: [
                    "Tofu, cubed",
                    "Broccoli florets",
                    "Carrots, sliced",
                    "Bell peppers, sliced",
                    "Soy sauce",
                    "Ginger, minced",
                    "Garlic, minced",
                    "Sesame oil",
                    "Cooked rice for serving"
                ],
                steps: [
                    "In a wok, heat sesame oil over medium-high heat.",
                    "Add minced ginger and garlic, sauté until fragrant.",
                    "Add cubed tofu and stir-fry until golden brown.",
                    "Add broccoli, carrots, and bell peppers. Cook until vegetables are tender-crisp.",
                    "Pour soy sauce over the stir-fry and toss to combine.",
                    "Serve over cooked rice."
                ],
                prepTime: 15,
                cookTime: 20,
                totalTime: 35,
                difficulty: "Medium",
                imageURL: "https://cdn.dummyjson.com/recipe-images/2.webp",
                createdAt: new Date().toISOString()
            },
            {
                id: (Date.now() + 2).toString(),
                title: "Chocolate Chip Cookies",
                description: "Soft and chewy cookies loaded with chocolate chips.",
                ingredients: [
                    "All-purpose flour",
                    "Butter, softened",
                    "Brown sugar",
                    "White sugar",
                    "Eggs",
                    "Vanilla extract",
                    "Baking soda",
                    "Salt",
                    "Chocolate chips"
                ],
                steps: [
                    "Preheat the oven to 350°F (175°C).",
                    "In a bowl, cream together softened butter, brown sugar, and white sugar.",
                    "Beat in eggs one at a time, then stir in vanilla extract.",
                    "Combine flour, baking soda, and salt. Gradually add to the wet ingredients.",
                    "Fold in chocolate chips.",
                    "Drop rounded tablespoons of dough onto ungreased baking sheets.",
                    "Bake for 10-12 minutes or until edges are golden brown.",
                    "Allow cookies to cool on the baking sheet for a few minutes before transferring to a wire rack."
                ],
                prepTime: 15,
                cookTime: 10,
                totalTime: 25,
                difficulty: "Easy",
                imageURL: "https://cdn.dummyjson.com/recipe-images/3.webp",
                createdAt: new Date().toISOString()
            },
            {
                id: (Date.now() + 3).toString(),
                title: "Chicken Alfredo Pasta",
                description: "Creamy Italian pasta with chicken and Parmesan cheese.",
                ingredients: [
                    "Fettuccine pasta",
                    "Chicken breast, sliced",
                    "Heavy cream",
                    "Parmesan cheese, grated",
                    "Garlic, minced",
                    "Butter",
                    "Salt and pepper to taste",
                    "Fresh parsley for garnish"
                ],
                steps: [
                    "Cook fettuccine pasta according to package instructions.",
                    "In a pan, sauté sliced chicken in butter until fully cooked.",
                    "Add minced garlic and cook until fragrant.",
                    "Pour in heavy cream and grated Parmesan cheese. Stir until the cheese is melted.",
                    "Season with salt and pepper to taste.",
                    "Combine the Alfredo sauce with cooked pasta.",
                    "Garnish with fresh parsley before serving."
                ],
                prepTime: 15,
                cookTime: 20,
                totalTime: 35,
                difficulty: "Medium",
                imageURL: "https://cdn.dummyjson.com/recipe-images/4.webp",
                createdAt: new Date().toISOString()
            },
            {
                id: (Date.now() + 4).toString(),
                title: "Mango Salsa Chicken",
                description: "Juicy chicken mixed with a fresh and tangy mango salsa.",
                ingredients: [
                    "Chicken thighs",
                    "Mango, diced",
                    "Red onion, finely chopped",
                    "Cilantro, chopped",
                    "Lime juice",
                    "Jalapeño, minced",
                    "Salt and pepper to taste",
                    "Cooked rice for serving"
                ],
                steps: [
                    "Season chicken thighs with salt and pepper.",
                    "Grill or bake chicken until fully cooked.",
                    "In a bowl, combine diced mango, chopped red onion, cilantro, minced jalapeño, and lime juice.",
                    "Dice the cooked chicken and mix it with the mango salsa.",
                    "Serve over cooked rice."
                ],
                prepTime: 15,
                cookTime: 25,
                totalTime: 40,
                difficulty: "Easy",
                imageURL: "https://cdn.dummyjson.com/recipe-images/5.webp",
                createdAt: new Date().toISOString()
            },
            {
                id: (Date.now() + 5).toString(),
                title: "Quinoa Salad with Avocado",
                description: "A refreshing salad with quinoa, avocado, and fresh vegetables.",
                ingredients: [
                    "Quinoa, cooked",
                    "Avocado, diced",
                    "Cherry tomatoes, halved",
                    "Cucumber, diced",
                    "Red bell pepper, diced",
                    "Feta cheese, crumbled",
                    "Lemon vinaigrette dressing",
                    "Salt and pepper to taste"
                ],
                steps: [
                    "In a large bowl, combine cooked quinoa, diced avocado, halved cherry tomatoes, diced cucumber, diced red bell pepper, and crumbled feta cheese.",
                    "Drizzle with lemon vinaigrette dressing and toss to combine.",
                    "Season with salt and pepper to taste.",
                    "Chill in the refrigerator before serving."
                ],
                prepTime: 20,
                cookTime: 15,
                totalTime: 35,
                difficulty: "Easy",
                imageURL: "https://cdn.dummyjson.com/recipe-images/6.webp",
                createdAt: new Date().toISOString()
            },
            {
                id: (Date.now() + 6).toString(),
                title: "Tomato Basil Bruschetta",
                description: "Crispy toasted baguette topped with fresh tomato and basil mixture.",
                ingredients: [
                    "Baguette, sliced",
                    "Tomatoes, diced",
                    "Fresh basil, chopped",
                    "Garlic cloves, minced",
                    "Balsamic glaze",
                    "Olive oil",
                    "Salt and pepper to taste"
                ],
                steps: [
                    "Preheat the oven to 375°F (190°C).",
                    "Place baguette slices on a baking sheet and toast in the oven until golden brown.",
                    "In a bowl, combine diced tomatoes, chopped fresh basil, minced garlic, and a drizzle of olive oil.",
                    "Season with salt and pepper to taste.",
                    "Top each toasted baguette slice with the tomato-basil mixture.",
                    "Drizzle with balsamic glaze before serving."
                ],
                prepTime: 15,
                cookTime: 10,
                totalTime: 25,
                difficulty: "Hard",
                imageURL: "https://cdn.dummyjson.com/recipe-images/7.webp",
                createdAt: new Date().toISOString()
            },
            {
                id: (Date.now() + 7).toString(),
                title: "Beef and Broccoli Stir-Fry",
                description: "Savory beef stir-fried with fresh broccoli and flavorful sauce.",
                ingredients: [
                    "Beef sirloin, thinly sliced",
                    "Broccoli florets",
                    "Soy sauce",
                    "Oyster sauce",
                    "Sesame oil",
                    "Garlic, minced",
                    "Ginger, minced",
                    "Cornstarch",
                    "Cooked white rice for serving"
                ],
                steps: [
                    "In a bowl, mix soy sauce, oyster sauce, sesame oil, and cornstarch to create the sauce.",
                    "In a wok, stir-fry thinly sliced beef until browned. Remove from the wok.",
                    "Stir-fry broccoli florets, minced garlic, and minced ginger in the same wok.",
                    "Add the cooked beef back to the wok and pour the sauce over the mixture.",
                    "Stir until everything is coated and heated through.",
                    "Serve over cooked white rice."
                ],
                prepTime: 20,
                cookTime: 15,
                totalTime: 35,
                difficulty: "Medium",
                imageURL: "https://cdn.dummyjson.com/recipe-images/8.webp",
                createdAt: new Date().toISOString()
            },
            {
                id: (Date.now() + 8).toString(),
                title: "Caprese Salad",
                description: "Refreshing Italian salad with fresh mozzarella, tomatoes, and basil.",
                ingredients: [
                    "Tomatoes, sliced",
                    "Fresh mozzarella cheese, sliced",
                    "Fresh basil leaves",
                    "Balsamic glaze",
                    "Extra virgin olive oil",
                    "Salt and pepper to taste"
                ],
                steps: [
                    "Arrange alternating slices of tomatoes and fresh mozzarella on a serving platter.",
                    "Tuck fresh basil leaves between the slices.",
                    "Drizzle with balsamic glaze and extra virgin olive oil.",
                    "Season with salt and pepper to taste.",
                    "Serve immediately as a refreshing salad."
                ],
                prepTime: 10,
                cookTime: 0,
                totalTime: 10,
                difficulty: "Easy",
                imageURL: "https://cdn.dummyjson.com/recipe-images/9.webp",
                createdAt: new Date().toISOString()
            },
            {
                id: (Date.now() + 9).toString(),
                title: "Shrimp Scampi Pasta",
                description: "Linguine pasta tossed in a garlic butter shrimp sauce.",
                ingredients: [
                    "Linguine pasta",
                    "Shrimp, peeled and deveined",
                    "Garlic, minced",
                    "White wine",
                    "Lemon juice",
                    "Red pepper flakes",
                    "Fresh parsley, chopped",
                    "Salt and pepper to taste"
                ],
                steps: [
                    "Cook linguine pasta according to package instructions.",
                    "In a skillet, sauté minced garlic in olive oil until fragrant.",
                    "Add shrimp and cook until pink and opaque.",
                    "Pour in white wine and lemon juice. Simmer until the sauce slightly thickens.",
                    "Season with red pepper flakes, salt, and pepper.",
                    "Toss cooked linguine in the shrimp scampi sauce.",
                    "Garnish with chopped fresh parsley before serving."
                ],
                prepTime: 15,
                cookTime: 20,
                totalTime: 35,
                difficulty: "Medium",
                imageURL: "https://cdn.dummyjson.com/recipe-images/10.webp",
                createdAt: new Date().toISOString()
            },
            {
                id: (Date.now() + 10).toString(),
                title: "Classic Margherita Pizza",
                description: "A simple and delicious Italian pizza with fresh mozzarella and basil.",
                ingredients: [
                    "Pizza dough",
                    "Tomato sauce",
                    "Fresh mozzarella cheese",
                    "Fresh basil leaves",
                    "Olive oil",
                    "Salt and pepper to taste"
                ],
                steps: [
                    "Preheat the oven to 475°F (245°C).",
                    "Roll out the pizza dough and spread tomato sauce evenly.",
                    "Top with slices of fresh mozzarella and fresh basil leaves.",
                    "Drizzle with olive oil and season with salt and pepper.",
                    "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
                    "Slice and serve hot."
                ],
                prepTime: 20,
                cookTime: 15,
                totalTime: 35,
                difficulty: "Easy",
                imageURL: "https://cdn.dummyjson.com/recipe-images/1.webp",
                createdAt: new Date().toISOString()
            }
        ];
        saveRecipes(initializeRecipes);
    }
};


// sample data
// const initializeRecipes = [
//     {
//         id: Date.now().toString(),
//         title: "Classic Pancakes",
//         description: "Fluffy and delicious pancakes to start your day.",
//         ingredients: [
//             "2 cups all-purpose flour",
//             "2 large eggs",
//             "1.5 cups milk",
//             "1 tbsp sugar",
//             "1 tsp baking powder",
//             "Pinch of salt"
//         ],
//         steps: [
//             "Mix dry ingredients in a large bowl.",
//             "Whisk eggs and milk together.",
//             "Combine wet and dry ingredients gently.",
//             "Cook batter on a hot griddle until golden brown on both sides."
//         ],
//         prepTime: 10,
//         cookTime: 5,
//         totalTime: 15,
//         difficulty: "Easy",
//         imageURL: "https://cdn.dummyjson.com/recipe-images/3.webp",
//         createdAt: new Date().toISOString()
//     }
//     // more recipes
// ];