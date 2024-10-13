import React from 'react';
import { Animated, View, Text, useWindowDimensions } from 'react-native';

const OnboardingItem = ({ item, scale, isZooming }) => {
    const { width } = useWindowDimensions();

    // Interpolating scale for zoom-out effect (applies only if isZooming is true)
    const animatedScale = isZooming
        ? scale.interpolate({
            inputRange: [0, width],
            outputRange: [1.5, 1],  // Image zooms out from 1.5 to 1
            extrapolate: 'clamp',
        })
        : 1;  // Static scale for non-zooming items

    return (
        <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.Image
                source={item.image}
                style={{
                    width: '80%',
                    height: '60%',
                    resizeMode: 'contain',
                    transform: [{ scale: animatedScale }],  // Apply animated scale
                }}
            />
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                {item.title}
            </Text>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>
                {item.description}
            </Text>
        </View>
    );
};

export default OnboardingItem;
