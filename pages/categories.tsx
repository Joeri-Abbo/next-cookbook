import {GetStaticProps} from 'next';
import Link from 'next/link';
import {Recipe} from '../interfaces/Recipe';
import {getAllRecipes} from '../lib/recipes';
import slugify from "slugify";

interface CategoriesProps {
    categories: string[];
}

export default function Categories({categories}: CategoriesProps) {
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
