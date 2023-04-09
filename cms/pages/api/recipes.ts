// pages/api/recipes.ts
import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import {Recipe} from '../../../interfaces/Recipe';
import {v4 as uuidv4} from 'uuid';

const dataDirectory = path.join(process.cwd(), '../', 'recipes');
const uploadPath = path.join(process.cwd(), 'public', 'recipe');

const getRecipeFilePath = (id: number) => path.join(dataDirectory, `${id}.json`);

const getAllRecipes = (): Recipe[] => {
    const fileNames = fs.readdirSync(dataDirectory);
    const recipes = fileNames.map((fileName) => {
        const filePath = path.join(dataDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    });
    return recipes;
};

const createRecipe = (recipe: Recipe) => {
    const filePath = getRecipeFilePath(recipe.id);
    fs.writeFileSync(filePath, JSON.stringify(recipe));
};

const updateRecipe = (updatedRecipe: Recipe): boolean => {
    const filePath = getRecipeFilePath(updatedRecipe.id);

    if (!fs.existsSync(filePath)) {
        return false;
    }

    fs.writeFileSync(filePath, JSON.stringify(updatedRecipe));
    return true;
};

const deleteRecipe = (id: number): boolean => {
    const filePath = getRecipeFilePath(id);

    if (!fs.existsSync(filePath)) {
        return false;
    }

    fs.unlinkSync(filePath);
    return true;
};

const upload = multer({dest: uploadPath});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        res.status(500).json({error: `Sorry, something went wrong: ${error.message}`});
    },
});

apiRoute.use(upload.single('image'));

apiRoute.all(async (req, res) => {
    const {method, body} = req;

    switch (method) {
        case 'GET':
            const recipes = getAllRecipes();
            res.status(200).json(recipes);
            break;

        case 'POST':
            const newRecipe: Recipe = body;
            if (req.file) {
                const recipeDir = path.join(uploadPath, `${newRecipe.id}`);
                if (!fs.existsSync(recipeDir)) {
                    fs.mkdirSync(recipeDir, {recursive: true});
                }

                const ext = path.extname(req.file.originalname);
                const filename = `${uuidv4()}${ext}`;
                const newFilePath = path.join(recipeDir, filename);

                fs.renameSync(req.file.path, newFilePath);
                newRecipe.imageUrl = `/recipe/${newRecipe.id}/${filename}`;
            }

            createRecipe(newRecipe);
            res.status(201).json({message: 'Recipe created'});
            break;

        case 'PUT':
            const updatedRecipe: Recipe = body;
            if (req.file) {
                const recipeDir = path.join(uploadPath, `${updatedRecipe.id}`);
                if (!fs.existsSync(recipeDir)) {
                    fs.mkdirSync(recipeDir, {recursive: true});
                }

                const ext = path.extname(req.file.originalname);
                const filename = `${uuidv4()}${ext}`;
                const newFilePath = path.join(recipeDir, filename);

                fs.renameSync(req.file.path, newFilePath);
                updatedRecipe.imageUrl = `/recipe/${updatedRecipe.id}/${filename}`;
            }

            const updated = updateRecipe(updatedRecipe);

            if (updated) {
                res.status(200).json({message: 'Recipe updated'});
                // ... (Continuing from previous code)
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
});

export default apiRoute;
