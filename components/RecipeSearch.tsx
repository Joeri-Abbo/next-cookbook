import React, {useState} from 'react';
import Link from "next/link";
import slugify from "slugify";
import LazyImage from "./LazyImage";
import {RecipeSearchProps} from "../interfaces/RecipeSearchProps";
import Card from "./Recipe/card";
import Cards from "./Recipe/cards";

const RecipeSearch: React.FC<RecipeSearchProps> = ({recipes}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full">
            <input

                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                className="text-5xl focus:outline-none text-center w-full"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Cards recipes={filteredRecipes}/>
        </div>
    );
};

export default RecipeSearch;
