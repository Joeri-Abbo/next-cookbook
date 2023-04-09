import type {NextPage} from 'next';
import {useState, useEffect} from 'react';
import RecipeForm from '../components/RecipeForm';
import RecipeItem from '../components/RecipeItem';
import {Recipe} from '../../interfaces/Recipe';

const Home: NextPage = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipes');
            const data: Recipe[] = await response.json();
            setRecipes(data);
        };

        fetchRecipes();
    }, []);

    const addRecipe = (recipe: Recipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, recipe]);
    };

    const updateRecipe = (updatedRecipe: Recipe) => {
        setRecipes((prevRecipes) =>
            prevRecipes.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe)),
        );
    };

    const deleteRecipe = async (id: number) => {
        await fetch(`/api/recipes?id=${id}`, {
            method: 'DELETE',
        });

        setRecipes(recipes.filter((recipe) => recipe.id !== id));
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Recipes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="border p-4 rounded shadow">
                    <RecipeForm onSubmit={addRecipe}/>
                </div>
                {recipes.map((recipe) => (
                    <RecipeItem
                        key={recipe.id}
                        recipe={recipe}
                        onDelete={deleteRecipe}
                        onUpdate={updateRecipe}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
