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
                <h1 className="mb-4 text-4xl font-bold">{recipe.title}</h1>
                <p className="mb-6 text-lg">{recipe.description}</p>
                <p className="mb-6 text-xl">{recipe.intro}</p>
                <p className="mb-6 text-xl">{recipe.outro}</p>
                <h2 className="mb-2 text-2xl font-semibold">
                    Category: {categoryName}
                </h2>
                <h3 className="mb-2 text-xl">Type: {recipe.type}</h3>
                <h3 className="mb-2 text-xl">
                    Preparation Time: {recipe.preparationTime}
                </h3>
                <h3 className="mb-6 text-xl">Baking Time: {recipe.bakingTime}</h3>

                <h3 className="mb-2 text-2xl font-semibold">Ingredients:</h3>
                <ul className="mb-6 list-inside list-disc">
                    {recipe.ingredients &&
                        recipe.ingredients.map((item, key) => (
                            <li key={key} className="mb-1">
                                {item}
                            </li>
                        ))}
                </ul>

                <h3 className="mb-2 text-2xl font-semibold">Instructions:</h3>
                <ol className="mb-6 list-inside list-decimal">
                    {recipe.instructions &&
                        recipe.instructions.map((item, key) => (
                            <li key={key} className="mb-1">
                                {item}
                            </li>
                        ))}
                </ol>
                <h3 className="mb-2 text-2xl font-semibold">Tags:</h3>
                <ul className="list-none">
                    {recipe.tags &&
                        recipe.tags.map((tag, key) => (
                            <li key={key}
                                className="mb-1 mr-1 inline-block rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                                {tag}
                            </li>
                        ))}
                </ul>
            </article>
            <Share asPath={router.asPath} text={'hallo'}/>
            <div className="mt-8">
                <h2 className="mb-4 text-3xl font-bold">Related Recipes:</h2>
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
