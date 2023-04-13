import {Recipe} from "../Recipe/Recipe";

export interface CategoryPageProps {
    recipes: Recipe[];
    categoryName: string;
}