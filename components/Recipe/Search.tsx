import React, {useState} from 'react';
import Link from "next/link";
import slugify from "slugify";
import LazyImage from "../Utilities/LazyImage";
import {RecipeSearchProps} from "../../interfaces/Recipe/RecipeSearchProps";
import Card from "./card";
import Cards from "./cards";

const Search: React.FC<RecipeSearchProps> = ({recipes}) => {
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
                className="w-full text-center text-5xl focus:outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Cards recipes={filteredRecipes}/>
        </div>
    );
};

export default Search;
