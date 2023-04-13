import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import {
    getAllRecipes,
    getRecipeBySlug,
    getRecipesByRelatedByIdAndCategory
} from '../../../lib/recipes';
import slugify from 'slugify';
import Share from "../../../components/Utilities/Share/Items";
import {RecipeDetailPageProps} from "../../../interfaces/RecipeDetailPageProps";
import Layout from "../../../components/Layout";
import Card from "../../../components/Recipe/card";
import React from "react";


export default function RecipeDetailPage({recipe, categoryName, relatedRecipes}: RecipeDetailPageProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout title={recipe.title}>
            <h1>{recipe.title}</h1>
            <h1>{recipe.description}</h1>
            <h1>{recipe.intro}</h1>
            <h1>{recipe.outro}</h1>
            <h2>Category: {categoryName}</h2>
            <h3>Type: {recipe.type}</h3>
            <h3>preparationTime: {recipe.preparationTime}</h3>
            <h3>bakingTime: {recipe.bakingTime}</h3>

            <ul className="list-disc">
                {recipe.ingredients && recipe.ingredients.map((item, key) => (
                    <li key={key}>
                        {item}
                    </li>
                ))}
            </ul>

            <ol className="list-decimal">
                {recipe.instructions && recipe.instructions.map((item, key) => (
                    <li key={key}>
                        {item}
                    </li>
                ))}
            </ol>
            <ul className="list-disc">
                {recipe.tags && recipe.tags.map((tag, key) => (
                    <li key={key}>
                        {tag}
                    </li>
                ))}
            </ul>
            <Share asPath={router.asPath} text={"hallo"}/>

            <ul className="list-disc">
                {relatedRecipes && relatedRecipes.map((recipe, key) => (
                    <Card recipe={recipe}/>
                ))}
            </ul>
        </Layout>
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
            relatedRecipes: getRecipesByRelatedByIdAndCategory(recipe.id, decodedCategory)
        },
    };
};
