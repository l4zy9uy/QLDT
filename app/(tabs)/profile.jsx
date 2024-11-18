import React, { useState, useRef } from "react";
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
} from "react-native";
import { icons } from "../../constants"; // Your custom icons
import Sidebar from "../../components/Sidebar"; // Refactored Sidebar
import Entypo from "@expo/vector-icons/Entypo";
import TopBar from "../../components/TopBar"; // Custom TopBar
import { useGlobalContext } from "../../context/GlobalProvider";

const ProfileScreen = () => {
    const SCREEN_WIDTH = Dimensions.get("window").width;
    const { fontScale, width, height } = useGlobalContext();
    const styles = makeStyles(fontScale, width, height);
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
            onMoveShouldSetPanResponder: (evt, gestureState) =>
                gestureState.dx > 20 && Math.abs(gestureState.dy) < 10,

            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx > 0) {
                    slideAnim.setValue(Math.min(gestureState.dx, SCREEN_WIDTH));
                }
            },

            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 100) {
                    Animated.timing(slideAnim, {
                        toValue: SCREEN_WIDTH,
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
            <StatusBar
                backgroundColor="transparent"
                translucent
                barStyle="light-content"
            />

            <TopBar
                leftComponent={
                    <Image source={icons.BKLogo} style={styles.logo} resizeMode="contain" />
                }
                centerComponent={
                    <Image
                        source={icons.whiteLogo}
                        style={styles.eHustLogo}
                        resizeMode="contain"
                    />
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

const makeStyles = (fontScale, width, height) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#f5f5f5", // Light background color for Material theme
        },
        topBar: {
            flexDirection: "row",
            backgroundColor: "#b30000", // Primary red color for the top bar
            height: height * 0.12, // Responsive App Bar height
            paddingTop: StatusBar.currentHeight || 20,
            width: "100%",
            alignItems: "center",
        },
        logo: {
            width: width * 0.1, // Responsive logo size
            height: width * 0.1,
            marginHorizontal: 16,
        },
        eHustLogo: {
            width: width * 0.2,
            height: width * 0.2,
        },
        content: {
            flex: 1,
            padding: width * 0.05, // Consistent padding for main content
        },
        header: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
        },
        text: {
            fontSize: 24 / fontScale,
            fontWeight: "bold",
            textAlign: "center",
        },
        sidebar: {
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "75%", // Responsive sidebar width
            backgroundColor: "#b30000", // Primary red color
            padding: width * 0.05, // Padding inside the sidebar
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            elevation: 8,
            zIndex: 5,
        },
        sidebarText: {
            fontSize: 16 / fontScale,
            fontWeight: "600",
            color: "white",
            marginBottom: 8,
        },
        iconButton: {
            marginHorizontal: width * 0.03,
        },
    });

export default ProfileScreen;
