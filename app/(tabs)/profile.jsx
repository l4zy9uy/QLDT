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
    Dimensions,
} from 'react-native';
import { icons } from "../../constants"; // Your custom icons
import Sidebar from "../../components/Sidebar"; // Refactored Sidebar
import Entypo from '@expo/vector-icons/Entypo';
import TopBar from "../../components/TopBar"; // Custom TopBar

const ProfileScreen = () => {
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const [isVisible, setIsVisible] = useState(false); // Sidebar visibility state
    const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current; // Start off-screen (right)

    const toggleSidebar = () => {
        Animated.timing(slideAnim, {
            toValue: isVisible ? SCREEN_WIDTH : 0, // Slide in or out
            duration: 300,
            useNativeDriver: true,
        }).start();
        setIsVisible(!isVisible);
    };

    const panResponder = useRef(
        PanResponder.create({
            // Only detect swiping right to close
            onMoveShouldSetPanResponder: (evt, gestureState) =>
                gestureState.dx > 20 && Math.abs(gestureState.dy) < 10,

            // Handle sidebar drag when swiping right
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx > 0) {
                    // Move sidebar according to swipe distance (right swipe)
                    slideAnim.setValue(Math.min(gestureState.dx, SCREEN_WIDTH));
                }
            },

            // Handle swipe release
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 100) {
                    // Close sidebar if swiped right far enough
                    Animated.timing(slideAnim, {
                        toValue: SCREEN_WIDTH,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(() => setIsVisible(false));
                } else {
                    // Keep sidebar open if swipe was not far enough
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

            <TopBar
                leftComponent={
                    <Image source={icons.BKLogo} style={styles.logo} resizeMode="contain" />
                }
                centerComponent={
                    <Image source={icons.whiteLogo} style={styles.eHustLogo} resizeMode="contain" />
                }
                rightComponent={
                    <TouchableOpacity onPress={toggleSidebar} style={styles.iconButton}>
                        <Entypo name="dots-three-vertical" size={24} color="white" />
                    </TouchableOpacity>
                }
            />

            {/* Main Content */}
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.text}>Profile Screen</Text>
                </View>
            </View>

            {/* Animated Sidebar */}
            <Sidebar
                slideAnim={slideAnim}
                panResponder={panResponder}
                isVisible={isVisible}
                toggleSidebar={toggleSidebar}
            />
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 30,
        marginTop: 40,
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
        right: 0, // Align the sidebar to the right
        top: 0,
        bottom: 0,
        width: 300,
        backgroundColor: '#b30000',
        padding: 16,
        zIndex: 5,
        elevation: 5,
    },
    sidebarText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconButton: {
        marginLeft: '60%',
    },
});

export default ProfileScreen;
