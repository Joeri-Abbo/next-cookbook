import React, {useState} from 'react';
import {Recipe} from '../../interfaces/Recipe/Recipe';
import RecipeForm from './RecipeForm';

interface RecipeItemProps {
    recipe: Recipe;
    onDelete: (id: number) => void;
    onUpdate: (recipe: Recipe) => void;
}

const RecipeItem: React.FC<RecipeItemProps> = ({recipe, onDelete, onUpdate}) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        onDelete(recipe.id);
    };

    const handleUpdate = (updatedRecipe: Recipe) => {
        onUpdate(updatedRecipe);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="rounded border p-4 shadow">
                <RecipeForm onSubmit={handleUpdate} initialData={recipe}>
                    <button
                        className="ml-2 mt-4 bg-red-500 px-3 py-1 text-white"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </RecipeForm>
            </div>
        );
    }
    return (
        <div className="rounded border p-4 shadow">
            <img src={recipe.imageUrl.startsWith("http") ? recipe.imageUrl : process.env.COOKBOOK_URL + recipe.imageUrl}
                 alt={recipe.title}
                 className="mb-4 h-48 w-full object-cover"/>

            <h2 className="mb-2 text-xl font-bold">{recipe.title}</h2>
            <p>Category: {recipe.category}</p>
            <p>Type: {recipe.type}</p>
            <button className="mr-2 mt-4 bg-blue-500 px-3 py-1 text-white" onClick={() => setIsEditing(true)}>
                Edit
            </button>
            <button className="mt-4 bg-red-500 px-3 py-1 text-white" onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};

export default RecipeItem;
