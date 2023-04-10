import React, {useState} from 'react';
import {Recipe} from '../../interfaces/Recipe';
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
            <div className="border p-4 rounded shadow">
                <RecipeForm onSubmit={handleUpdate} initialData={recipe}>
                    <button
                        className="bg-red-500 text-white py-1 px-3 mt-4 ml-2"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </RecipeForm>
            </div>
        );
    }
    return (
        <div className="border p-4 rounded shadow">
            <img src={recipe.imageUrl.startsWith("http") ? recipe.imageUrl : process.env.COOKBOOK_URL + recipe.imageUrl}
                 alt={recipe.title}
                 className="w-full h-48 object-cover mb-4"/>

            <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
            <p>Category: {recipe.category}</p>
            <p>Type: {recipe.type}</p>
            <button className="bg-blue-500 text-white py-1 px-3 mt-4 mr-2" onClick={() => setIsEditing(true)}>
                Edit
            </button>
            <button className="bg-red-500 text-white py-1 px-3 mt-4" onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};

export default RecipeItem;
