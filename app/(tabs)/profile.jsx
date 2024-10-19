import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    StatusBar,
    TouchableOpacity,
    PanResponder,
    Image,
} from 'react-native';
import { icons } from "../../constants";
import Sidebar from "../../components/Sidebar";
import Entypo from '@expo/vector-icons/Entypo';

const ProfileScreen = () => {
    const [isVisible, setIsVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(-300)).current; // Sidebar hidden initially

    const toggleSidebar = () => {
        Animated.timing(slideAnim, {
            toValue: isVisible ? -300 : 0, // Animate to hidden or visible position
            duration: 300,
            useNativeDriver: true,
        }).start();
        setIsVisible(!isVisible);
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) =>
                Math.abs(gestureState.dx) > 20,
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx < 0) {
                    slideAnim.setValue(gestureState.dx);
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx < -100) {
                    Animated.timing(slideAnim, {
                        toValue: -300,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(() => setIsVisible(false));
                } else {
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />

            {/* Top Bar */}
            <View style={styles.topBar}>
                {/* Left-side Logo */}
                <View style={styles.iconContainer}>
                    <Image source={icons.BKLogo} style={styles.logo} resizeMode="contain" />
                </View>

                {/* Centered eHUST Logo */}
                <View style={styles.iconContainer}>
                    <Image source={icons.whiteLogo} style={styles.eHustLogo} resizeMode="contain" />
                </View>

                {/* Right-side Toggle Button */}
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={toggleSidebar} style={styles.iconButton}>
                        <Entypo name="dots-three-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.text}>Profile Screen</Text>
                </View>

                <Animated.View
                    style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
                    {...panResponder.panHandlers}
                >
                    <Text style={styles.sidebarText}>Sidebar Content</Text>
                    <Sidebar toggleSidebar={toggleSidebar} isVisible={isVisible} slideAnim={slideAnim} />
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    topBar: {
        flexDirection: 'row',
        backgroundColor: '#b30000',
        height: 80, // Fixed height for the top bar
        paddingTop: StatusBar.currentHeight || 20,
        width: '100%',
    },
    iconContainer: {
        flex: 1, // Each container takes up equal space
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally
    },
    logo: {
        width: 50,
        height: 50,
        overflow: 'hidden',
        marginRight: 30,
        marginTop: 50,
    },
    eHustLogo: {
        width: 70,
        height: 70,
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 300,
        backgroundColor: 'white',
        padding: 16,
        zIndex: 5,
        elevation: 5,
    },
    sidebarText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconButton: {
        marginLeft: '60%'
    }
});

export default ProfileScreen;
