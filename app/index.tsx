import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { RecipeCard } from '../src/components/RecipeCard';
import { RecipeDetails } from '../src/components/RecipeDetails';
import { ProteinFilters } from '../src/components/ProteinFilters';
import { recipeService } from '../src/services/recipeService';
import { Recipe, RecipeDetail } from '../src/types/recipe';
import { StatusBar } from 'expo-status-bar';
import { styles } from './index.styles';

export default function App() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null);
    const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const searchRecipes = async (ingredient: string) => {
        setLoading(true);
        try {
            const results = await recipeService.getRecipesByIngredient(ingredient);
            setRecipes(results);
        } catch (error) {
            console.error('Error searching recipes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProteinSelect = (protein: string) => {
        setSearchTerm(protein.toLowerCase());
    };

    useEffect(() => {
        if (searchTerm.trim()) {
            const debounce = setTimeout(() => {
                searchRecipes(searchTerm);
            }, 500);
            return () => clearTimeout(debounce);
        }
    }, [searchTerm]);

    const handleRecipePress = async (recipe: Recipe) => {
        setShowDetails(true);
        setLoadingDetails(true);
        try {
            const details = await recipeService.getRecipeById(recipe.idMeal);
            setSelectedRecipe(details);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        } finally {
            setLoadingDetails(false);
        }
    };

    if (showDetails) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text 
                        style={styles.backButton}
                        onPress={() => {
                            setShowDetails(false);
                            setSelectedRecipe(null);
                        }}
                    >
                        ← Back to Search
                    </Text>
                </View>
                <RecipeDetails recipe={selectedRecipe} loading={loadingDetails} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.header}>
                <Text style={styles.title}>Recipe Finder</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter an ingredient (e.g., chicken)"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <ProteinFilters onSelectProtein={handleProteinSelect} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => (
                        <RecipeCard recipe={item} onPress={handleRecipePress} />
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            {searchTerm.trim()
                                ? 'No recipes found. Try a different ingredient!'
                                : 'Enter an ingredient to search for recipes'}
                        </Text>
                    }
                />
            )}
        </SafeAreaView>
    );
}

