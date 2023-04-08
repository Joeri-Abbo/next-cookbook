import fs from 'fs';
import path from 'path';
import {Recipe} from '../interfaces/Recipe';
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

export function getRecipeBySlug(slug: string): Recipe {
    const allRecipes = getAllRecipes();
    const recipe = allRecipes.find((recipe) => slugify(recipe.title, {lower: true}) === slug);
    if (!recipe) {
        throw new Error(`Cannot find recipe with slug '${slug}'`);
    }
    return recipe;
}

