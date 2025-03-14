import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { RecipeDetail } from '../types/recipe';
import { convertTemperatures } from '../utils/temperature';
import { styles } from './RecipeDetails.styles';

interface RecipeDetailsProps {
    recipe: RecipeDetail | null;
    loading: boolean;
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe, loading }) => {
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!recipe) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Recipe not found</Text>
            </View>
        );
    }
    console.log(recipe);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image
                    source={{ uri: recipe.strMealThumb }}
                    style={styles.image}
                />
                <View style={styles.content}>
                    <Text style={styles.title}>{recipe.strMeal}</Text>
                    <Text style={styles.subtitle}>
                        {recipe.strCategory} • {recipe.strArea}
                    </Text>

                    <Text style={styles.sectionTitle}>Ingredients</Text>
                    <View style={styles.ingredientsList}>
                        {recipe.ingredients.map((ingredient, index) => (
                            <Text key={index} style={styles.ingredientItem}>
                                {recipe.measurements[index] || ''} {ingredient}
                            </Text>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Instructions</Text>
                    {recipe.strInstructions
                        .split(/\n\s+/)
                        .filter(step => step.trim())
                        .map((instruction, index) => (
                            <Text key={index} style={styles.instruction}>
                                {convertTemperatures(instruction.trim())}
                            </Text>
                        ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
