import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import { icons } from "../constants";

const FormField = ({
                       title,
                       value,
                       placeholder,
                       handleChangeText,
                       otherStyles = {},
                       secureTextEntry = false, // Pass this if it's a password field
                       ...props
                   }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { fontScale, width, height } = useGlobalContext();
    const styles = makeStyles(fontScale, width, height);

    console.log(showPassword)
    return (
        <View style={[styles.container, otherStyles]}>
            {title && <Text style={styles.label}>{title}</Text>}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#888888"
                    onChangeText={handleChangeText}
                    secureTextEntry={secureTextEntry && !showPassword} // Toggle based on showPassword state
                    {...props}
                />
                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={showPassword ? icons.eyeHide : icons.eye} // Toggle icon
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const makeStyles = (fontScale, width, height) =>
    StyleSheet.create({
        container: {
            marginVertical: 10,
        },
        label: {
            fontSize: 14 / fontScale,
            color: "#c62828", // Red for label
            fontWeight: "600",
            marginBottom: 5,
            paddingHorizontal: width * 0.03*2,
        },
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            height: height * 0.06,
            paddingHorizontal: width * 0.03,
            backgroundColor: "#FFFFFF", // White background for contrast
            borderRadius: 100,
            borderColor: "#BBBBBB", // Light grey border
            borderWidth: 1.5,
        },
        input: {
            flex: 1,
            fontSize: 12 / fontScale,
            color: "#000000", // Black text color for readability
            paddingHorizontal: width * 0.03,
        },
        icon: {
            width: 34,
            height: 24,
            tintColor: "#888888", // Grey color for the icon
        },
    });

export default FormField;
