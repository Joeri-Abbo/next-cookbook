import Link from "next/link";
import slugify from "slugify";
import LazyImage from "../LazyImage";
import React from "react";
import {cardRecipe} from "../../interfaces/cardRecipe";

const Card = ({recipe}: cardRecipe) => (
    <div className="bg-amber-500">
        <Link
            key={recipe.id}
            href={`/recipe/${encodeURIComponent(recipe.category)}/${slugify(recipe.title, {
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
            {recipe.title}
            {recipe.description && (<p>
                {recipe.description}
            </p>)}
        </Link>
    </div>
)
export default Card;