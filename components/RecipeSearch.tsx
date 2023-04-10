import React, {useState} from 'react';
import {Recipe} from '../interfaces/Recipe';
import Link from "next/link";
import slugify from "slugify";

interface RecipeSearchProps {
    recipes: Recipe[];
}

const RecipeSearch: React.FC<RecipeSearchProps> = ({recipes}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
                {filteredRecipes.map((recipe) => (
                    <div key={recipe.id} className="recipe">
                        {/* Display your recipe information here */}
                        <Link
                            href={`/recipe/${encodeURIComponent(recipe.category)}/${slugify(recipe.title, {
                                lower: true,
                            })}`}
                        >
                            {recipe.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeSearch;
