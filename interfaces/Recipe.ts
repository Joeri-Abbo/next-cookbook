export interface Recipe {
    id: number;
    title: string;
    category: string;
    ingredients: string[];
    instructions: string[];
    tags: string[] | null;
    image: string | null;
    imageUrl: string | null;
    type: string;
}