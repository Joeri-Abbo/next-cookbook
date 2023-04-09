import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import {Recipe} from '../../../interfaces/Recipe';
import {getAllRecipes, getRecipeBySlug} from '../../../lib/recipes';
import slugify from 'slugify';
import Whatsapp from "../../../components/Utilities/Share/Whatsapp";
import Facebook from "../../../components/Utilities/Share/Facebook";

interface RecipeDetailPageProps {
    recipe: Recipe;
    categoryName: string;

}

export default function RecipeDetailPage({recipe, categoryName}: RecipeDetailPageProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{recipe.title}</h1>
            <h2>Category: {categoryName}</h2>
            <h3>Type: {recipe.type}</h3>

            {recipe.tags && recipe.tags.map((tag) => (
                <div key={tag}>
                    <span>{tag}</span>
                </div>
            ))}
            {/* Add more recipe details and styling */}

            <Whatsapp asPath={router.asPath} text={"hallo"}/>
            <Facebook asPath={router.asPath} text={"hallo"}/>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const recipes = getAllRecipes();

    const paths = recipes.map((recipe) => ({
        params: {
            category: encodeURIComponent(recipe.category),
            slug: encodeURIComponent(slugify(recipe.title, {lower: true})),
        },
    }));

    return {
        paths,
        fallback: false,
    };
};


export const getStaticProps: GetStaticProps = async (context) => {
    const {category, slug} = context.params!;
    const decodedCategory = decodeURIComponent(category as string);
    const recipe = getRecipeBySlug(decodedCategory, slug as string);

    if (!recipe) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            recipe,
            categoryName: decodedCategory,
        },
    };
};
