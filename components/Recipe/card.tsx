import Link from "next/link";
import slugify from "slugify";
import LazyImage from "../Utilities/LazyImage";
import React from "react";
import {card} from "../../interfaces/Recipe/Card";
import Cards from "../tags/cards";

const Card = ({recipe}: card) => (
    <div className="p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200">
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
                    className="w-full h-64 object-cover rounded-t"
                />
                <Cards tags={recipe.tags}/>
                <div className="text-xl font-semibold mt-2 mb-1">
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
