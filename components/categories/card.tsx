import Link from "next/link";
import slugify from "slugify";
import LazyImage from "../Utilities/LazyImage";
import React from "react";
import {Card} from "../../interfaces/Category/Card";
import {random} from "nanoid";

const Card = ({category}: Card) => (
    <Link
        key={random(20).toString()}
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
            className="absolute bottom-5 left-2 bg-black px-2 py-1 text-white opacity-70">
                            {category}
                        </span>
    </Link>
)
export default Card;