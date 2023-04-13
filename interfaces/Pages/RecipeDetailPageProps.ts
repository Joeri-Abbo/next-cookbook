import {Recipe} from "../Recipe/Recipe";

export interface RecipeDetailPageProps {
    recipe: Recipe;
    categoryName: string;
    relatedRecipes?: Recipe[];
}