import {GetStaticProps} from 'next';
import {Recipe} from '../interfaces/Recipe';
import {getAllRecipes} from '../lib/recipes';
import Link from "next/link";
import slugify from "slugify";

interface HomeProps {
    recipes: Recipe[];
    categories: string[];
}

export default function Home({recipes, categories}: HomeProps) {
    return (
        <div>
            <h1>Recipe Categories</h1>
            {categories.map((category) => (
                <div key={category}>
                    <h2>
                        <Link href={`/category/${encodeURIComponent(slugify(category, {lower: true}))}`}>
                            {category}
                        </Link>
                    </h2>
                </div>
            ))}

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
    const categories = Array.from(new Set(recipes.map((recipe) => recipe.category)));

    return {
        props: {
            categories,
            recipes,
        },
    };
};