import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import {getAllRecipes, getRecipesByCategory} from '../../lib/recipes';
import slugify from "slugify";
import Search from "../../components/Recipe/Search";
import Layout from "../../components/Layout";
import {CategoryPageProps} from "../../interfaces/Pages/CategoryPageProps";


export default function CategoryPage({recipes, categoryName}: CategoryPageProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <h1>Recipes in {categoryName} category</h1>
            <Search recipes={recipes}/>
        </Layout>
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
