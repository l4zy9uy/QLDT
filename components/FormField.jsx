import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";

import { icons } from "../constants";

const FormField = ({
                       title,
                       value,
                       placeholder,
                       handleChangeText,
                       otherStyles = {},
                       ...props
                   }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={[styles.container, otherStyles]}>
            {title && <Text style={styles.label}>{title}</Text>}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#BBBBBB" // Light grey for better visibility
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "PASSWORD" && !showPassword}
                    {...props}
                />
                {title === "PASSWORD" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        color: "#c62828", // Red for label
        fontWeight: "600",
        marginBottom: 5,
        paddingHorizontal: 24,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 60,
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF", // White background for contrast
        borderRadius: 32,
        borderColor: "#BBBBBB", // Light grey border
        borderWidth: 1.5,
    },
    input: {
        flex: 1,
        fontSize: 12,
        color: "#000000", // Black text color for readability
        paddingHorizontal: 12,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: "#888888", // Grey color for the icon
    },
});

export default FormField;
