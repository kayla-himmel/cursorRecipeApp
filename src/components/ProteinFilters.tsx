import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
} from 'react-native';
import { styles } from './ProteinFilters.styles';

interface ProteinFiltersProps {
    onSelectProtein: (protein: string) => void;
}

const proteins = [
    'Chicken',
    'Beef',
    'Pork',
    'Tofu',
    'Lamb',
    'Salmon',
];

export const ProteinFilters: React.FC<ProteinFiltersProps> = ({ onSelectProtein }) => {
    return (
        <View style={styles.container}>
            <View style={styles.scrollContent}>
                {proteins.map((protein) => (
                    <TouchableOpacity
                        key={protein}
                        style={styles.button}
                        onPress={() => onSelectProtein(protein)}
                    >
                        <Text style={styles.buttonText}>{protein}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

