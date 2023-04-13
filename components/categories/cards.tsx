import React from "react";
import {Cards} from "../../interfaces/Category/Cards";
import Card from "./card";

const Cards = ({categories}: Cards) => (
    <>
        {categories && (<div className="mt-4 grid grid-cols-2 flex-col-reverse gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
                <Card category={category}/>
            ))}
        </div>)}
    </>
)
export default Cards;