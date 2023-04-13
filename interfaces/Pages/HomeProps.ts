import {Recipe} from "../Recipe/Recipe";

export interface HomeProps {
    recipes: Recipe[];
    categories: string[];
}