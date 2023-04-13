// pages/api/recipes.ts
import {NextApiRequest, NextApiResponse} from 'next';
import fs from 'fs';
import path from 'path';
import {Recipe} from '../../../interfaces/Recipe/Recipe';

const dataDirectory = path.join(process.cwd(), '../', 'recipes');
const getRecipeFilePath = (id: number) => path.join(dataDirectory, `${id}.json`);

const getAllRecipes = (): Recipe[] => {
    const filenames = fs.readdirSync(dataDirectory);
    const recipes = filenames.map((filename) => {
        const filePath = path.join(dataDirectory, filename);
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    });

    return recipes;
};

const getRecipeById = (id: number): Recipe | null => {
    const filePath = getRecipeFilePath(id);

    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } else {
        return null;
    }
};

const createRecipe = (recipe: Recipe) => {
    const filePath = getRecipeFilePath(recipe.id);
    fs.writeFileSync(filePath, JSON.stringify(recipe, null, 2));
};

const updateRecipe = (recipe: Recipe) => {
    const filePath = getRecipeFilePath(recipe.id);

    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(recipe, null, 2));
        return true;
    } else {
        return false;
    }
};

const deleteRecipe = (id: number) => {
    const filePath = getRecipeFilePath(id);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
    } else {
        return false;
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {method, body} = req;

    switch (method) {
        case 'GET':
            const recipes = getAllRecipes();
            res.status(200).json(recipes);
            break;

        case 'POST':
            const newRecipe: Recipe = body;
            createRecipe(newRecipe);
            res.status(201).json({message: 'Recipe created'});
            break;

        case 'PUT':
            const updatedRecipe: Recipe = body;
            const updated = updateRecipe(updatedRecipe);

            if (updated) {
                res.status(200).json({message: 'Recipe updated'});
            } else {
                res.status(404).json({message: 'Recipe not found'});
            }
            break;

        case 'DELETE':
            const idToDelete = parseInt(req.query.id as string);
            const deleted = deleteRecipe(idToDelete);

            if (deleted) {
                res.status(200).json({message: 'Recipe deleted'});
            } else {
                res.status(404).json({message: 'Recipe not found'});
            }
            break;

        default:
            res.status(405).json({message: 'Method not allowed'});
    }
};