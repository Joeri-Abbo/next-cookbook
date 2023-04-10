import React, {useState} from 'react';
import {Recipe} from '../interfaces/Recipe';

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
                        <h3>{recipe.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeSearch;
