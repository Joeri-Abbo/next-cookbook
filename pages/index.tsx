import {GetStaticProps} from 'next';
import {Recipe} from '../interfaces/Recipe';
import {getAllRecipes} from '../lib/recipes';
import Link from "next/link";
import slugify from "slugify";
import RecipeSearch from '../components/RecipeSearch';
import Layout from "../components/Layout";
import Image from "next/image";
import LazyImage from "../components/LazyImage";

interface HomeProps {
    recipes: Recipe[];
    categories: string[];
}

export default function Home({recipes, categories}: HomeProps) {
    return (
        <Layout>
            <h1 className="text-4xl text-center	">Recipe Categories</h1>
            <div className="mt-4 grid grid-cols-2 flex-col-reverse gap-4 md:grid-cols-3 lg:grid-cols-6">
                {categories.map((category) => (
                    <Link
                        href={`/category/${encodeURIComponent(
                            slugify(category, {lower: true})
                        )}`}

                        className="relative h-32 overflow-hidden bg-gray-500"
                        aria-label={category}>
                        <LazyImage
                            src={
                                'https://source.unsplash.com/random/?' +
                                category +
                                '&width=200&height=100'
                            }
                            alt={category}
                            className="absolute w-full overflow-auto bg-cover bg-center"
                        />
                        <span
                            className="absolute bottom-5 left-2 bg-black py-1 px-2 text-white opacity-70">
                            {category}
                        </span>
                    </Link>
                ))}
            </div>
            <RecipeSearch recipes={recipes}/>
        </Layout>
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