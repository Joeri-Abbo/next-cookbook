import {GetStaticPaths, GetStaticProps} from 'next';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Recipe} from '../../interfaces/Recipe';
import {getAllRecipes, getRecipesByCategory} from '../../lib/recipes';
import slugify from "slugify";

interface CategoryPageProps {
    recipes: Recipe[];
    categoryName: string;

}

export default function CategoryPage({recipes, categoryName}: CategoryPageProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Recipes in {categoryName} category</h1>
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
                </div>
            ))}
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const recipes = getAllRecipes();

    const categories = new Set(recipes.map((recipe) => recipe.category));
    const paths = Array.from(categories).map((category) => ({
        params: {slugifiedCategory: encodeURIComponent(slugify(category, {lower: true}))},
    }));

    return {
        paths,
        fallback: false,
    };
};
export const getStaticProps: GetStaticProps = async (context) => {
    const {slugifiedCategory} = context.params!;
    const decodedCategory = decodeURIComponent(slugifiedCategory as string);
    const recipes = getRecipesByCategory(decodedCategory);

    return {
        props: {
            recipes,
            categoryName: decodedCategory,
        },
    };
};
