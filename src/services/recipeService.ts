import { Recipe, RecipeResponse, RecipeDetail } from '../types/recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const transformRecipeDetails = (apiResponse: any): RecipeDetail => {
    const ingredients: string[] = [];
    const measurements: string[] = [];

    // Get all ingredient and measurement keys
    const ingredientKeys = Object.keys(apiResponse)
        .filter(key => key.startsWith('strIngredient') && apiResponse[key]);

    // Extract and pair ingredients with measurements
    ingredientKeys.forEach(key => {
        const index = key.replace('strIngredient', '');
        const ingredient = apiResponse[key];
        const measure = apiResponse[`strMeasure${index}`];

        if (ingredient && ingredient.trim()) {
            ingredients.push(ingredient.trim());
            measurements.push(measure?.trim() || '');
        }
    });

    return {
      idMeal: apiResponse.idMeal,
      strMeal: apiResponse.strMeal,
      strMealThumb: apiResponse.strMealThumb,
      strInstructions: apiResponse.strInstructions,
      strCategory: apiResponse.strCategory,
      strArea: apiResponse.strArea,
      ingredients,
      measurements,
    };
};

export const recipeService = {
    async getRecipesByIngredient(ingredient: string): Promise<Recipe[]> {
        try {
            const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
            const data: RecipeResponse = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error('Error fetching recipes:', error);
            return [];
        }
    },

    async getRecipeById(id: string): Promise<RecipeDetail | null> {
        try {
            const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
            const data = await response.json();
            if (!data.meals?.[0]) return null;
            return transformRecipeDetails(data.meals[0]);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            return null;
        }
    }
}; 