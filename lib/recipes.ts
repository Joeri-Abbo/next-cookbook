import fs from 'fs';
import path from 'path';
import {Recipe} from '../interfaces/Recipe/Recipe';
import slugify from "slugify";

const recipesDirectory = path.join(process.cwd(), 'recipes');

export function getAllRecipeIds() {
    const fileNames = fs.readdirSync(recipesDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.json$/, ''),
            },
        };
    });
}

export function getRecipeData(id: string): Recipe {
    const fullPath = path.join(recipesDirectory, `${id}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
}

export function getAllRecipes(): Recipe[] {
    const fileNames = fs.readdirSync(recipesDirectory);
    return fileNames.map((fileName) => {
        return getRecipeData(fileName.replace(/\.json$/, ''));
    });
}

export function getRecipeBySlug(category: string, slug: string): Recipe | null {
    const allRecipes = getAllRecipes();
    const recipe = allRecipes.find(
        (recipe) =>
            slugify(recipe.category, {lower: true}) === category &&
            slugify(recipe.title, {lower: true}) === slug
    );
    return recipe || null;
}

export function getRecipeById(id: number): Recipe | null {
    const allRecipes = getAllRecipes();
    const recipe = allRecipes.find(
        (recipe) => recipe.id === id
    );
    return recipe || null;
}


export function getRecipesByCategory(slugifiedCategory: string): Recipe[] {
    const allRecipes = getAllRecipes();
    return allRecipes.filter(
        (recipe) => slugify(recipe.category, {lower: true}) === slugifiedCategory
    );
}

export function getRecipesByRelatedById(id: number): Recipe[] {
    const recipe = getRecipeById(id)
    if (!recipe) {
        return []
    }

    return getRecipesByRelatedByIdAndCategory(id, recipe.category)
}

export function getRecipesByRelatedByIdAndCategory(id: number, category: string): Recipe[] {
    return getRecipesByCategory(slugify(category, {lower: true})).filter(
        (r) => r.id !== id
    )
}

export function getCategories(): Set<string> {

    const recipes = getAllRecipes();

    return new Set(recipes.map((recipe) => recipe.category));
}

export function getTags(): string[] {
    const recipes = getAllRecipes();
    const tags = [];
    recipes.forEach((recipe) => {
        if (recipe.tags && recipe.tags.length > 0) {
            recipe.tags.forEach((tag) => {
                tags.push(tag)
            })
        }
    })
    return tags;
}

export function getRecipesByTag(tagFilter: string): Recipe[] {
    const recipeAll = getAllRecipes();

    let recipes = []
    recipeAll.forEach(
        (recipe) => {
            recipe.tags.forEach((tag) => {
                if (slugify(tag, {lower: true}) === tagFilter) {
                    recipes.push(recipe)
                }
            })
        }
    )
    return recipes
}