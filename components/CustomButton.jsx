import React from 'react';
import { ActivityIndicator, Text, Pressable, StyleSheet } from 'react-native';

const CustomButton = ({
                          title,
                          handlePress,
                          containerStyle = {},
                          textStyle = {},
                          isLoading = false,
                          disabled = false,
                      }) => {
    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                styles.button,
                containerStyle, // Custom styles passed from props
                pressed && styles.pressed, // Style for when button is pressed
                (disabled || isLoading) && styles.disabled, // Style when disabled or loading
            ]}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color={textStyle.color || "#FFFFFF"} size="small" />
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#c62828', // Default red color
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', // Allows icon or loading spinner beside text
    },
    text: {
        color: '#FFFFFF', // Default text color
        fontSize: 16,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.8, // Slight opacity when pressed
    },
    disabled: {
        opacity: 0.5, // Lower opacity when disabled or loading
    },
});

export default CustomButton;
