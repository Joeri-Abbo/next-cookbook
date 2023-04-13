import React from "react";
import {cardsRecipe} from "../../interfaces/cardsRecipe";
import Card from "./card";

const Cards = ({recipes}: cardsRecipe) => (
    <>
        {recipes && (
            <div className="mt-4 grid grid-cols-2 flex-col-reverse gap-4 md:grid-cols-2 lg:grid-cols-4">
                {recipes.map((recipe) => (
                    <Card recipe={recipe}/>
                ))}
            </div>
        )}
    </>
)
export default Cards;