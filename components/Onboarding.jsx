import React, { useRef } from 'react';
import { View, Animated, FlatList, Dimensions } from 'react-native';
import slides from '../slides';  // Assuming you have an array of slide data
import OnboardingItem from './OnboardingItem';  // Onboarding slide component


const Onboarding = () => {
    // Animated value to track scroll position
    const scrollX = useRef(new Animated.Value(0)).current;

    const renderItem = ({ item, index }) => {
        if (index === 0) {
            // First slide: Use the original image and apply zoom-out on scroll
            return <OnboardingItem item={item} scale={scrollX} isZooming />;
        } else if (index === 1) {
            // Second slide: Keep the image zoomed out at 1 scale
            return <OnboardingItem item={item} scale={scrollX} isZooming />;
        } else {
            // Third slide: Different image, no zooming
            return <OnboardingItem item={item} scale={1} />;
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Animated.FlatList
                data={slides}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}  // For smoother scrolling events
            />
        </View>
    );
};

export default Onboarding;
