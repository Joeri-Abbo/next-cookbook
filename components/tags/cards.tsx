import React from "react";
import {Cards as CardsProps} from "../../interfaces/Tags/Cards";
import Card from "./card";

const Cards = ({tags}: CardsProps) => (
    <>
        {tags && (
            <ul className="list-disc list-inside flex flex-wrap gap-1 mt-2 mb-2">
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
