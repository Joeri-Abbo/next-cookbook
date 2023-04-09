import React from 'react';
import {Recipe} from '../../interfaces/Recipe';
import RecipeItem from './RecipeItem';

interface RecipeListProps {
    recipes: Recipe[];
    onEdit: (recipe: Recipe) => void;
    onDelete: (id: number) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({recipes, onEdit, onDelete}) => {
    return (
        <div>
            {recipes.map((recipe) => (
                <RecipeItem key={recipe.id} recipe={recipe} onUpdate={onEdit} onDelete={onDelete}/>
            ))}
        </div>
    );
};

export default RecipeList;
