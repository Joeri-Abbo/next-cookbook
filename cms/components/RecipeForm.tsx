// components/RecipeForm.tsx
import React, {useState, useEffect} from 'react';
import {Recipe} from '../../interfaces/Recipe';

interface RecipeFormProps {
    onSubmit: (recipe: Recipe) => void;
    initialData?: Recipe;
}

const RecipeForm: React.FC<RecipeFormProps> = ({onSubmit, initialData}) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setCategory(initialData.category);
            setIngredients(initialData.ingredients.join(', '));
            setInstructions(initialData.instructions.join(', '));
            setTags(initialData.tags ? initialData.tags.join(', ') : '');
            setImageUrl(initialData.imageUrl);
            setType(initialData.type);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const recipeData: Recipe = {
            id: initialData?.id || Date.now(),
            title,
            category,
            ingredients: ingredients.split(',').map((item) => item.trim()),
            instructions: instructions.split(',').map((item) => item.trim()),
            tags: tags ? tags.split(',').map((item) => item.trim()) : null,
            imageUrl,
            type,
        };

        if (initialData) {
            // Update recipe
            await fetch('/api/recipes', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(recipeData),
            });
        } else {
            // Create recipe
            await fetch('/api/recipes', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(recipeData),
            });
        }

        onSubmit(recipeData);

        setTitle('');
        setCategory('');
        setIngredients('');
        setInstructions('');
        setTags('');
        setImageUrl('');
        setType('');
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
            </label>
            <label>
                Category:
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
            </label>
            <label>
                Ingredients (comma-separated):
                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
            </label>
            <label>
                Instructions (comma-separated):
                <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
            </label>
            <label>
                Tags (comma-separated):
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
            </label>
            <label>
                Image URL:
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
            </label>
            <label>
                Type:
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                >
                    <option value="">Select type</option>
                    <option value="voorgerecht">Voorgerecht</option>
                    <option value="tussengerecht">Tussengerecht</option>
                    <option value="hoofdgerecht">Hoofdgerecht</option>
                    <option value="nagerecht">Nagrecht</option>
                    <option value="dranken">Dranken</option>
                </select>
            </label>
            <button
                type="submit"
                className="bg-blue-500 text-white py-1 px-3 mt-4"
            >
                {initialData ? 'Update' : 'Add'} Recipe
            </button>
        </form>
    );
};

export default RecipeForm;
