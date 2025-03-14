import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Recipe } from '../types/recipe';
import { styles } from './RecipeCard.styles';

interface RecipeCardProps {
    recipe: Recipe;
    onPress: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
    return (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => onPress(recipe)}
        >
            <Image
                source={{ uri: recipe.strMealThumb }}
                style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.title}>{recipe.strMeal}</Text>
            </View>
        </TouchableOpacity>
    );
};
