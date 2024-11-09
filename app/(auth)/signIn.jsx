import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    ScrollView,
    Alert,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { icons } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { getCurrentUser, signIn } from "../../libs/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import Checkbox from "expo-checkbox";
import ForgotPassWord from "./forgotPassword";

const SignIn = () => {
    const { setUser, setIsLogged } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [rememberMe, setRememberMe] = useState(false);

    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setSubmitting(true);

        try {
            await signIn(form.email, form.password);
            const result = await getCurrentUser();
            setUser(result);
            setIsLogged(true);

            Alert.alert("Success", "User signed in successfully");
            router.replace("/home");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false);

    const openForgotPasswordPopup = () => setForgotPasswordVisible(true);
    const closeForgotPasswordPopup = () => setForgotPasswordVisible(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                <View style={styles.innerContainer}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={icons.redLogo}
                            resizeMode="center"
                            style={styles.logo}
                        />
                    </View>

                    {/* Welcome Text */}
                    <Text style={styles.welcomeText}>Welcome back</Text>
                    <Text style={styles.subText}>Continue to sign in!</Text>

                    {/* Email Input */}
                    <FormField
                        title="EMAIL"
                        value={form.email}
                        placeholder="Enter your email"
                        placeholderTextColor="#888888"
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        keyboardType="email-address"
                    />
                    <FormField
                        title="PASSWORD"
                        value={form.password}
                        placeholder="Enter your password"
                        placeholderTextColor="#888888"
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        secureTextEntry={true}
                    />


                    {/* Forgot Password Link */}
                    <TouchableOpacity onPress={openForgotPasswordPopup}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        <ForgotPassWord
                        visible={isForgotPasswordVisible}
                        onClose={closeForgotPasswordPopup}
                        />
                    </TouchableOpacity>

                    {/* Remember Me Checkbox */}
                    <View style={styles.rememberMeContainer}>
                        <Checkbox
                            value={rememberMe}
                            onValueChange={setRememberMe}
                            color={rememberMe ? "#c62828" : undefined}
                        />
                        <Text style={styles.rememberMeText}>Remember me and keep me logged in</Text>
                    </View>

                    {/* Sign In Button */}
                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyle={styles.signInButton} // Applying styles to make button visible
                        textStyle={styles.signInButtonText} // Title style for button text color
                        isLoading={isSubmitting}
                    />

                    {/* Sign Up Link */}
                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpPrompt}>Don't have an Account?</Text>
                        <Link href="/signUp" style={styles.signUpLink}>
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF", // Set background to white
    },
    innerContainer: {
        width: "90%",
        alignSelf: "center",
        marginTop: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    logo: {
        width: 180,
        height: 80,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#c62828", // Red color for welcome text
        textAlign: "center",
        marginTop: 20,
    },
    subText: {
        fontSize: 16,
        color: "#000000", // Black color for subtitle
        textAlign: "center",
        marginBottom: 20,
    },
    formField: {
        marginTop: 15,
    },
    input: {
        backgroundColor: "#FFFFFF", // Pure white background for high contrast
        borderColor: "#888888", // Darker grey border for more contrast
        borderWidth: 1.5,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
        fontSize: 16,
        color: "#000000", // Black text color
        shadowColor: "#000", // Shadow for slight elevation
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    forgotPasswordText: {
        color: "#c62828", // Red color for "Forgot Password?"
        fontSize: 14,
        textAlign: "right",
        marginTop: 8,
        marginBottom: 10,
    },
    rememberMeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    rememberMeText: {
        fontSize: 14,
        color: "#000000", // Black color for "Remember me" text
        marginLeft: 8,
    },
    signInButton: {
        backgroundColor: "#c62828", // Red background for sign-in button
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center", // Center text in button
    },
    signInButtonText: {
        color: "#FFFFFF", // White color for button text
        fontWeight: "bold",
        fontSize: 16,
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    signUpPrompt: {
        fontSize: 14,
        color: "#000000", // Black color for "Don't have an account?"
    },
    signUpLink: {
        fontSize: 14,
        color: "#c62828", // Red color for Sign Up link
        fontWeight: "bold",
        marginLeft: 5,
    },
});

export default SignIn;
