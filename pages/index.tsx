import {GetStaticProps} from 'next';
import {Recipe} from '../interfaces/Recipe';
import {getAllRecipes} from '../lib/recipes';

interface HomeProps {
    recipes: Recipe[];
}

export default function Home({recipes}: HomeProps) {
    return (
        <div>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <h2>{recipe.title}</h2>
                    {/* Add more recipe details and styling */}
                </div>
            ))}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const recipes = getAllRecipes();
    return {
        props: {
            recipes,
        },
    };
};