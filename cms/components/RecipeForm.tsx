import React, {useState} from 'react';
import {Recipe} from '../../interfaces/Recipe';

interface RecipeFormProps {
    onSubmit: (recipe: Recipe) => void;
    initialData?: Recipe;
}

const RecipeForm: React.FC<RecipeFormProps> = ({onSubmit, initialData}) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [ingredients, setIngredients] = useState(initialData?.ingredients.join(', ') || '');
    const [instructions, setInstructions] = useState(initialData?.instructions.join(', ') || '');
    const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
    const [type, setType] = useState(initialData?.type || '');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const recipeData: Recipe = {
            id: initialData?.id || Date.now(),
            title,
            category,
            ingredients: ingredients.split(',').map((item) => item.trim()),
            instructions: instructions.split(',').map((item) => item.trim()),
            tags: tags ? tags.split(',').map((item) => item.trim()) : null,
            imageUrl: initialData?.imageUrl || '',
            type,
        };

        const formData = new FormData();
        if (imageFile) {
            formData.append('image', imageFile);
        }
        Object.keys(recipeData).forEach((key) => {
            formData.append(key, recipeData[key]);
        });

        const requestOptions: RequestInit = {
            method: initialData ? 'PUT' : 'POST',
            body: formData,
        };

        const response = await fetch('/api/recipes', requestOptions);
        const updatedRecipe = await response.json();

        onSubmit(updatedRecipe);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
            </div>

            <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                    Ingredients (separate with commas)
                </label>
                <input
                    type="text"
                    id="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
            </div>

            <div>
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                    Instructions (separate with commas)
                </label>
                <input
                    type="text"
                    id="instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
            </div>

            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags
                </label>
                <input
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
            </div>

            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type
                </label>
                <input
                    type="text"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
            </div>

            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image
                </label>
                <input type="file" id="image" name="image" onChange={handleFileChange}/>
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
                {initialData ? 'Update Recipe' : 'Add Recipe'}
            </button>
        </form>
    );
};

export default RecipeForm;
