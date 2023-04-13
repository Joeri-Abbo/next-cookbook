import {Recipe} from "./Recipe";

export interface HomeProps {
    recipes: Recipe[];
    categories: string[];
}