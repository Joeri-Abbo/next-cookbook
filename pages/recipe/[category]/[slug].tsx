import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import {Recipe} from '../../../interfaces/Recipe';
import {getAllRecipes, getRecipeBySlug} from '../../../lib/recipes';
import slugify from 'slugify';

interface RecipeDetailPageProps {
    recipe: Recipe;
}

export default function RecipeDetailPage({recipe}: RecipeDetailPageProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{recipe.title}</h1>
            {/* Add more recipe details and styling */}
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const recipes = getAllRecipes();

    const paths = recipes.map((recipe) => ({
        params: {category: recipe.category, slug: slugify(recipe.title, {lower: true})},
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const {slug} = context.params!;
    const recipe = getRecipeBySlug(slug as string);

    return {
        props: {
            recipe,
        },
    };
};
