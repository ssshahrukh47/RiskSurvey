import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import colors from '../res/themes/Colors';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    isBackButton?: boolean;
    style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, isBackButton, style }) => {
    return (
        <TouchableOpacity
            style={[styles.button, isBackButton && styles.backButton, style]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    
    button: {
        backgroundColor: colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    buttonText: {
        fontSize: 17,
        color: colors.white,
        fontWeight: '500'
    },
    backButton: {
        backgroundColor: colors.grayColor,
    },
});

export default CustomButton;
