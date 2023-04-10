import React, {useState, useEffect} from 'react';
import {Recipe} from '../../interfaces/Recipe';
import InputField from "./Fields/Input";
import SelectField from "./Fields/Select";
import MultiInputField from "@/components/Fields/MultiInput";

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
        setInstructions(newInstructions);
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
            await fetch('/api/recipes', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(recipeData),
            });
        } else {
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

    const handleImageUpload = async (file: File) => {
        if (file) {
            const data = new FormData();
            data.append("file", file);

            try {
                const response = await fetch("/api/uploadImage", {
                    method: "POST",
                    body: data,
                });

                const result = await response.json();

                if (result.success) {
                    setImageUrl(result.filePath);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField title={"Title"} value={title} onChange={(e) => setTitle(e.target.value)}/>
            <InputField title={"Category"} value={category} onChange={(e) => setCategory(e.target.value)}/>
            <MultiInputField
                onChangeInput={handleInstructionChange}
                onRemoveInput={handleRemoveInstruction}
                onAddInput={handleAddInstruction}
                title={'Instructions'}
                items={instructions}/>

            <MultiInputField
                onChangeInput={handleIngredientChange}
                onRemoveInput={handleRemoveIngredient}
                onAddInput={handleAddIngredient}
                title={'Ingredients'}
                items={ingredients}/>

            <MultiInputField
                onChangeInput={handleTagChange}
                onRemoveInput={handleRemoveTag}
                onAddInput={handleAddTag}
                title={'Tags'}
                items={tags}/>
            {/*@ts-ignore*/}
            <input type="file" accept="image/*" title={"Upload Image"}
                   onChange={(e) => handleImageUpload(e.target.files[0])}/>

            {/*<Input title={"Image URL"} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>*/}
            <SelectField title={"Type"} value={type} onChange={(e: any) => setType(e.target.value)} options={[
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
