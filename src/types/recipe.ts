export interface Recipe {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
}

export interface RecipeResponse {
    meals: Recipe[];
}

export interface RecipeDetail extends Recipe {
    strInstructions: string;
    strCategory: string;
    strArea: string;
    ingredients: string[];
    measurements: string[];
}

export interface RecipeDetailResponse {
    meals: RecipeDetail[];
}

export interface IngredientsResponse {
    meals: Ingredient[];
}

export interface Ingredient {
    strIngredient: string;
} 