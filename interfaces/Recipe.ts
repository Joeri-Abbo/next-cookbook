export interface Recipe {
    id: number;
    title: string;
    category: string;
    ingredients: string[];
    instructions: string[];
    tags: string[] | null;
    imageUrl: string;
    type: string;
    preparationTime: number | null;
    bakingTime: number | null;
}