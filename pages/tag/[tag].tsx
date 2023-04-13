import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import {getTags, getRecipesByTag} from '../../lib/recipes';
import slugify from "slugify";
import Search from "../../components/Recipe/Search";
import Layout from "../../components/Layout";
import {TagPageProps} from "../../interfaces/Pages/TagPageProps";


export default function TagPage({recipes, tagName}: TagPageProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <h1>Recipes in {tagName} tag</h1>
            <Search recipes={recipes}/>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const tags = getTags()
    const paths = Array.from(tags).map((tag) => ({
        params: {tag: encodeURIComponent(slugify(tag, {lower: true}))},
    }));

    return {
        paths,
        fallback: false,
    };
};
export const getStaticProps: GetStaticProps = async (context) => {
    const {tag} = context.params!;
    const decodedTag = decodeURIComponent(tag as string);
    const recipes = getRecipesByTag(decodedTag);

    return {
        props: {
            recipes,
            tagName: decodedTag,
        },
    };
};
