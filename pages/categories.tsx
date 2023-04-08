import {GetStaticProps} from 'next';
import Link from 'next/link';
import {Recipe} from '../interfaces/Recipe';
import {getAllRecipes} from '../lib/recipes';

interface CategoriesProps {
    categories: string[];
}

export default function Categories({categories}: CategoriesProps) {
    return (
        <div>
            <h1>Recipe Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category}>
                        <Link href={`/category/${encodeURIComponent(category)}`}>
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const recipes = getAllRecipes();
    const categories = Array.from(new Set(recipes.map((recipe) => recipe.category)));

    return {
        props: {
            categories,
        },
    };
};
