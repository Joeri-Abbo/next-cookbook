import {GetStaticPaths, GetStaticProps} from 'next';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Recipe} from '../../interfaces/Recipe';
import {getAllRecipes} from '../../lib/recipes';
import slugify from "slugify";

interface CategoryPageProps {
    recipes: Recipe[];
}

export default function CategoryPage({recipes}: CategoryPageProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Recipes in {router.query.category} category</h1>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <h2>
                        <Link
                            href={`/recipe/${encodeURIComponent(recipe.category)}/${slugify(recipe.title, {
                                lower: true,
                            })}`}
                        >
                            {recipe.title}
                        </Link>
                    </h2>
                    {/* Add more recipe details and styling */}
                </div>
            ))}
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const recipes = getAllRecipes();

    const paths = recipes.map((recipe) => ({
        params: { category: encodeURIComponent(recipe.category), slug: encodeURIComponent(slugify(recipe.title, { lower: true })) },
    }));

    return {
        paths,
        fallback: false,
    };
};


export const getStaticProps: GetStaticProps = async (context) => {
    const {category} = context.params!;
    const allRecipes = getAllRecipes();
    const recipes = allRecipes.filter((recipe) => recipe.category === category);

    return {
        props: {
            recipes,
        },
    };
};
