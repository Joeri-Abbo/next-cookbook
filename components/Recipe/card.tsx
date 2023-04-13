import Link from "next/link";
import slugify from "slugify";
import LazyImage from "../Utilities/LazyImage";
import React from "react";
import {card} from "../../interfaces/Recipe/Card";
import Cards from "../tags/cards";

const Card = ({recipe}: card) => (
    <div className="rounded p-4 shadow-md transition-shadow duration-200 hover:shadow-lg">
        <Link
            key={recipe.id}
            href={`/recipe/${slugify(recipe.category, {
                lower: true,
            })}/${slugify(recipe.title, {
                lower: true,
            })}`}
        >
            <div className="block">
                <LazyImage
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="h-64 w-full rounded-t object-cover"
                />
                <Cards tags={recipe.tags}/>
                <div className="mb-1 mt-2 text-xl font-semibold">
                    {recipe.title}
                </div>
                {recipe.description && (
                    <p className="text-sm text-gray-700">
                        {recipe.description}
                    </p>
                )}
            </div>
        </Link>
    </div>
);
export default Card;
