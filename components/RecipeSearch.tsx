import React, {useState} from 'react';
import Link from "next/link";
import slugify from "slugify";
import LazyImage from "./LazyImage";
import {RecipeSearchProps} from "../interfaces/RecipeSearchProps";
import Card from "./Recipe/card";

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
            <div className="mt-4 grid grid-cols-2 flex-col-reverse gap-4 md:grid-cols-2 lg:grid-cols-4">
                {filteredRecipes.map((recipe) => (
                    <Card recipe={recipe}/>
                ))}
            </div>
        </div>
    );
};

export default RecipeSearch;
