import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import {
    getAllRecipes,
    getRecipeBySlug,
    getRecipesByRelatedByIdAndCategory,
} from '../../../lib/recipes';
import slugify from 'slugify';
import Share from '../../../components/Utilities/Share/Items';
import {RecipeDetailPageProps} from '../../../interfaces/Pages/RecipeDetailPageProps';
import Layout from '../../../components/Layout';
import React from 'react';
import Cards from '../../../components/Recipe/cards';

export default function RecipeDetailPage({
                                             recipe,
                                             categoryName,
                                             relatedRecipes,
                                         }: RecipeDetailPageProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout title={recipe.title}>
            <article>
                <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
                <p className="text-lg mb-6">{recipe.description}</p>
                <p className="text-xl mb-6">{recipe.intro}</p>
                <p className="text-xl mb-6">{recipe.outro}</p>
                <h2 className="text-2xl font-semibold mb-2">
                    Category: {categoryName}
                </h2>
                <h3 className="text-xl mb-2">Type: {recipe.type}</h3>
                <h3 className="text-xl mb-2">
                    Preparation Time: {recipe.preparationTime}
                </h3>
                <h3 className="text-xl mb-6">Baking Time: {recipe.bakingTime}</h3>

                <h3 className="text-2xl font-semibold mb-2">Ingredients:</h3>
                <ul className="list-disc list-inside mb-6">
                    {recipe.ingredients &&
                        recipe.ingredients.map((item, key) => (
                            <li key={key} className="mb-1">
                                {item}
                            </li>
                        ))}
                </ul>

                <h3 className="text-2xl font-semibold mb-2">Instructions:</h3>
                <ol className="list-decimal list-inside mb-6">
                    {recipe.instructions &&
                        recipe.instructions.map((item, key) => (
                            <li key={key} className="mb-1">
                                {item}
                            </li>
                        ))}
                </ol>
                <h3 className="text-2xl font-semibold mb-2">Tags:</h3>
                <ul className="list-none">
                    {recipe.tags &&
                        recipe.tags.map((tag, key) => (
                            <li key={key}
                                className="inline-block bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-full mr-1 mb-1">
                                {tag}
                            </li>
                        ))}
                </ul>
            </article>
            <Share asPath={router.asPath} text={'hallo'}/>
            <div className="mt-8">
                <h2 className="text-3xl font-bold mb-4">Related Recipes:</h2>
                <Cards recipes={relatedRecipes}/>
            </div>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const recipes = getAllRecipes();

    const paths = recipes.map((recipe) => ({
        params: {
            category: encodeURIComponent(
                slugify(recipe.category, {lower: true})
            ),
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
            relatedRecipes: getRecipesByRelatedByIdAndCategory(
                recipe.id,
                decodedCategory
            ),
        },
    };
};
