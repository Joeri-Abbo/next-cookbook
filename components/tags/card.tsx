import Link from "next/link";
import slugify from "slugify";
import LazyImage from "../Utilities/LazyImage";
import React from "react";
import {card} from "../../interfaces/Recipe/Card";
import {Html} from "next/document";

const Card = ({recipe}: card) => (
    <div className="bg-amber-500 p-4">
        <Link
            key={recipe.id}
            href={`/recipe/${slugify(recipe.category, {
                lower: true,
            })}/${slugify(recipe.title, {
                lower: true,
            })}`}
        >
            <LazyImage
                src={
                    recipe.imageUrl
                }
                alt={recipe.title}
                className="w-full"
            />
            <ul className="list-disc">
                {recipe.tags && recipe.tags.map((tag, key) => (
                    <li key={key}>
                        {tag}
                    </li>
                ))}
            </ul>
            <div className="text-xl">
                {recipe.title}
            </div>
            {recipe.description && (<p>
                {recipe.description}
            </p>)}
        </Link>
    </div>
)
export default Card;