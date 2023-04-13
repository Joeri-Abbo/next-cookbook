import {Recipe} from "./Recipe";

export interface CategoryPageProps {
    recipes: Recipe[];
    categoryName: string;
}