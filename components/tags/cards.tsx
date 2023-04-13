import React from "react";
import {Cards} from "../../interfaces/Tags/Cards";
import Card from "./card";

const Cards = ({tags}: Cards) => (
    <>
        {tags && (
            <ul className="list-disc">
                {tags && tags.map((tag, key) => (
                    <li key={key}>
                        <Card tag={tag}/>
                    </li>
                ))}
            </ul>
        )}
    </>
)
export default Cards;