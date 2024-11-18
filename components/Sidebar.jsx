import React, { useState } from "react";
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {useGlobalContext} from "../context/GlobalProvider";

const Sidebar = ({ slideAnim, panResponder, isVisible, toggleSidebar }) => {
    const { fontScale, width, height } = useGlobalContext();
    const styles = makeStyles(fontScale, width, height);
    const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleSwitch = () => setIsSwitchEnabled((previous) => !previous);

    const handleRadioSelect = (option) => setSelectedOption(option);

    return (
        <>
            {/* Overlay */}
            {isVisible && (
                //TouchableWithoutFeedback ensures that the touchable area spans the full screen without any additional styling.
                <TouchableWithoutFeedback onPress={toggleSidebar}>
                    <Animated.View
                        style={[
                            styles.overlay,
                            {
                                opacity: slideAnim.interpolate({
                                    inputRange: [-300, 0],
                                    outputRange: [0, 1], // Fade-in the overlay as the sidebar slides in
                                }),
                            },
                        ]}
                    />
                </TouchableWithoutFeedback>
            )}

            {/* Sidebar */}
            <Animated.View
                style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
                {...panResponder.panHandlers}
            >
                {/* Sidebar Header */}
                <View style={styles.header}>
                    <Ionicons name="logo-react" size={70} color="white" />
                    <Text style={styles.headerText}>eHUST</Text>
                </View>

                {/* Notification Switch */}
                <View style={styles.menuItem}>
                    <Ionicons name="notifications-outline" size={24} color="white" />
                    <Text style={styles.menuText}>Notifications</Text>
                    <Switch
                        value={isSwitchEnabled}
                        onValueChange={toggleSwitch}
                        thumbColor={isSwitchEnabled ? "#fff" : "#f4f3f4"}
                        trackColor={{ false: "#767577", true: "#ff6b6b" }}
                    />
                </View>

                {/* Radio Button Options */}
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleRadioSelect("summary")}
                >
                    <Ionicons
                        name={
                            selectedOption === "summary"
                                ? "radio-button-on"
                                : "radio-button-off"
                        }
                        size={24}
                        color="white"
                    />
                    <Text style={styles.menuText}>Summary Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleRadioSelect("event")}
                >
                    <Ionicons
                        name={
                            selectedOption === "event"
                                ? "radio-button-on"
                                : "radio-button-off"
                        }
                        size={24}
                        color="white"
                    />
                    <Text style={styles.menuText}>Event Notifications</Text>
                </TouchableOpacity>

                {/* Timing Option */}
                <View style={styles.menuItem}>
                    <Ionicons name="time-outline" size={24} color="white" />
                    <Text style={styles.menuText}>Notify 15 minutes before</Text>
                </View>

                {/* FaceID/TouchID Option */}
                <TouchableOpacity style={styles.menuItem}>
                    <MaterialCommunityIcons name="fingerprint" size={24} color="white" />
                    <Text style={styles.menuText}>Setup TouchID/FaceID</Text>
                </TouchableOpacity>

                {/* Logout Option */}
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="log-out-outline" size={24} color="white" />
                    <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>eHUST v1.1.8</Text>
                </View>
            </Animated.View>
        </>
    );
};

const makeStyles = (fontScale, width, height) => StyleSheet.create({
    sidebar: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "75%",
        backgroundColor: "#b30000", // Red color theme
        padding: 20,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 2,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
        zIndex: 1,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24 / fontScale,
        fontWeight: "700",
        color: "white",
        marginTop: 8,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
    },
    menuText: {
        flex: 1,
        marginLeft: 10,
        color: "white",
        fontSize: 16 / fontScale,
    },
    footer: {
        marginTop: "auto",
        alignItems: "center",
        paddingVertical: 20,
    },
    footerText: {
        color: "white",
        fontSize: 14 / fontScale,
    },
});

export default Sidebar;
