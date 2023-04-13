import Link from "next/link";
import slugify from "slugify";
import LazyImage from "../Utilities/LazyImage";
import React from "react";
import {Card} from "../../interfaces/Category/Card";

const Card = ({category}: Card) => (
    <Link
        href={`/category/${encodeURIComponent(
            slugify(category, {lower: true})
        )}`}

        className="relative h-32 overflow-hidden bg-gray-500"
        aria-label={category}>
        <LazyImage
            src={
                'https://source.unsplash.com/random/?' +
                category +
                '&width=200&height=100'
            }
            alt={category}
            className="absolute w-full overflow-auto bg-cover bg-center"
        />
        <span
            className="absolute bottom-5 left-2 bg-black py-1 px-2 text-white opacity-70">
                            {category}
                        </span>
    </Link>
)
export default Card;