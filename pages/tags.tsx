import {GetStaticProps} from 'next';
import {getTags} from '../lib/recipes';
import Layout from "../components/Layout";
import {TagsProps} from "../interfaces/Pages/TagsProps";
import React from "react";
import Link from "next/link";
import slugify from "slugify";

export default function Tags({tags}: TagsProps) {
    return (
        <Layout>
            <h1 className="text-center text-4xl">Recipes</h1>
            <ul>
                {tags && tags.map((tag, key) => (
                    <li key={key}>
                        <Link
                            href={`/tag/${slugify(tag, {
                                lower: true,
                            })}`}
                        >
                            {tag}
                        </Link>
                    </li>
                ))}
            </ul>

        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const tags = getTags();
    return {
        props: {
            tags,
        },
    };
};