import {GetStaticProps} from 'next';
import {getAllRecipes} from '../lib/recipes';
import Search from '../components/Recipe/Search';
import Layout from "../components/Layout";
import Categories from "../components/categories/cards";
import {HomeProps} from "../interfaces/Pages/HomeProps";

export default function Home({recipes, categories}: HomeProps) {
    return (
        <Layout>
            <h1 className="text-4xl text-center	">Recipe Categories</h1>
            <Categories categories={categories}/>
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