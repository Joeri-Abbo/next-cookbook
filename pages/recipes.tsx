import {GetStaticProps} from 'next';
import {getAllRecipes} from '../lib/recipes';
import Link from "next/link";
import slugify from "slugify";
import Search from '../components/Recipe/Search';
import Layout from "../components/Layout";
import LazyImage from "../components/Utilities/LazyImage";
import {HomeProps} from "../interfaces/Pages/HomeProps";


export default function Home({recipes, categories}: HomeProps) {
    return (
        <Layout>
            <h1 className="text-4xl text-center	">Recipes</h1>
            <Search recipes={recipes}/>
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