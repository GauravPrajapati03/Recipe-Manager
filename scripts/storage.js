// localStorage CRUD Operations

import { initalRecipes } from './recipeData.js';
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
        console.log('initializing recipes');
        saveRecipes(initalRecipes);
    }
};
