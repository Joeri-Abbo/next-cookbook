// components/RecipeForm.tsx
import React, {useState, useEffect} from 'react';
import {Recipe} from '../../interfaces/Recipe';
import Input from "./Fields/Input";
import Select from "./Fields/Select";

interface RecipeFormProps {
    onSubmit: (recipe: Recipe) => void;
    initialData?: Recipe;
    children?: React.ReactNode;
}

const RecipeForm: React.FC<RecipeFormProps> = ({onSubmit, initialData, children}) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [instructions, setInstructions] = useState<string[]>(['']);
    const [tags, setTags] = useState<string[]>(['']);
    const [imageUrl, setImageUrl] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setCategory(initialData.category);
            setIngredients(initialData.ingredients ? initialData.ingredients : []);
            setInstructions(initialData.instructions ? initialData.instructions : []);
            setTags(initialData.tags ? initialData.tags : []);
            setImageUrl(initialData.imageUrl);
            setType(initialData.type);
        }
    }, [initialData]);
    const handleAddInstruction = () => {
        setInstructions([...instructions, '']);
    };

    const handleInstructionChange = (index: number, value: string) => {
        const newInstructions = [...instructions];
        newInstructions[index] = value;
        setIngredients(newInstructions);
    };

    const handleRemoveInstruction = (index: number) => {
        const newInstructions = [...instructions];
        newInstructions.splice(index, 1);
        setInstructions(newInstructions);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleRemoveIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleAddTag = () => {
        setTags([...tags, '']);
    };

    const handleTagChange = (index: number, value: string) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
    };

    const handleRemoveTag = (index: number) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const recipeData: Recipe = {
            id: initialData?.id || Date.now(),
            title,
            category,
            ingredients: ingredients.map((item) => item.trim()),
            instructions: instructions.map((item) => item.trim()),
            tags: tags ? tags.map((item) => item.trim()) : null,
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
        setIngredients([]);
        setInstructions([]);
        setTags([]);
        setImageUrl('');
        setType('');
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input title={"Title"} value={title} onChange={(e) => setTitle(e.target.value)}/>
            <Input title={"Category"} value={category} onChange={(e) => setCategory(e.target.value)}/>
            <div>
                <label>Instructions:</label>
                {instructions.map((instruction, index) => (
                    <div key={index} className="flex space-x-2">
                        <input
                            type="text"
                            value={instruction}
                            onChange={(e) => handleInstructionChange(index, e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                        />
                        {index > 0 && (
                            <button type="button" onClick={() => handleRemoveInstruction(index)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddInstruction}>
                    Add instruction
                </button>
            </div>
            <div>
                <label>Ingredients:</label>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex space-x-2">
                        <input
                            type="text"
                            value={ingredient}
                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                        />
                        {index > 0 && (
                            <button type="button" onClick={() => handleRemoveIngredient(index)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddIngredient}>
                    Add Ingredient
                </button>
            </div>

            <div>
                <label>Tags:</label>
                {tags.map((tag, index) => (
                    <div key={index} className="flex space-x-2">
                        <input
                            type="text"
                            value={tag}
                            onChange={(e) => handleTagChange(index, e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                        />
                        {index > 0 && (
                            <button type="button" onClick={() => handleRemoveTag(index)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddTag}>
                    Add Tag
                </button>
            </div>
            <Input title={"Image URL"} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
            {/*@ts-ignore*/}
            <Select title={"Type"} value={type} onChange={(e) => setType(e.target.value)} options={[
                {value: "voorgerecht", label: "Voorgerecht"},
                {value: "tussengerecht", label: "Tussengerecht"},
                {value: "hoofdgerecht", label: "Hoofdgerecht"},
                {value: "nagerecht", label: "Nagerecht"},
                {value: "dranken", label: "Dranken"},
            ]}/>
            <button
                type="submit"
                className="bg-blue-500 text-white py-1 px-3 mt-4"
            >
                {initialData ? 'Update' : 'Add'} Recipe
            </button>
            {children}
        </form>
    );
};

export default RecipeForm;
