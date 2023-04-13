import {GetStaticProps} from 'next';
import {getAllRecipes} from '../lib/recipes';
import Search from '../components/Recipe/Search';
import Layout from "../components/Layout";
import {RecipesProps} from "../interfaces/Pages/RecipesProps";

export default function Recipes({recipes}: RecipesProps) {
    return (
        <Layout>
            <h1 className="text-4xl text-center	">Recipes</h1>
            <Search recipes={recipes}/>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const recipes = getAllRecipes();

    return {
        props: {
            recipes,
        },
    };
};