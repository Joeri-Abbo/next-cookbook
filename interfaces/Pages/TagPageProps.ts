import {Recipe} from "../Recipe/Recipe";

export interface TagPageProps {
    recipes: Recipe[];
    tagName: string;
}