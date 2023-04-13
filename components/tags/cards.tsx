import React from "react";
import {Cards as CardsProps} from "../../interfaces/Tags/Cards";
import Card from "./card";

const Cards = ({tags}: CardsProps) => (
    <>
        {tags && (
            <ul className="mb-2 mt-2 flex list-inside list-disc flex-wrap gap-1">
                {tags.map((tag, key) => (
                    <li key={key} className="inline">
                        <Card tag={tag}/>
                    </li>
                ))}
            </ul>
        )}
    </>
);
export default Cards;
