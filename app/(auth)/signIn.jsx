import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    ScrollView,
    Alert,
    Image,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Link, router } from "expo-router";
import { CustomButton, FormField } from "../../components";
import { getCurrentUser, signIn } from "../../libs/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import ForgotPassWord from "./forgotPassword";

const SignIn = () => {
    const { fontScale } = useWindowDimensions();
    const styles = makeStyles(fontScale);
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
                            source={icons.redLogo} // Your logo should be available in icons
                            resizeMode="contain"
                            style={styles.logo}
                        />
                    </View>

                    {/* Welcome Text */}
                    <Text style={styles.welcomeText}>Welcome Back</Text>
                    <Text style={styles.subText}>Sign in to your account</Text>

                    {/* Email Input */}
                    <FormField
                        title="Email Address"
                        value={form.email}
                        placeholder="Enter your email"
                        placeholderTextColor="#888888"
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
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
                            color={rememberMe ? "#c62828" : undefined} // Red checkbox color
                        />
                        <Text style={styles.rememberMeText}>Remember me</Text>
                    </View>

                    {/* Sign In Button */}
                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyle={styles.signInButton}
                        textStyle={styles.signInButtonText}
                        isLoading={isSubmitting}
                    />

                    {/* Sign Up Link */}
                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpPrompt}>Don't have an account?</Text>
                        <Link href="/signUp" style={styles.signUpLink}>
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const makeStyles = (fontScale) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#FFFFFF", // White background
        },
        innerContainer: {
            width: "90%",
            alignSelf: "center",
            marginTop: 20,
        },
        logoContainer: {
            alignItems: "center",
            marginVertical: 20,
        },
        logo: {
            width: 120,
            height: 120,
        },
        welcomeText: {
            fontSize: 24 / fontScale,
            fontWeight: "600",
            color: "#c62828", // Red color
            textAlign: "center",
            marginBottom: 5,
        },
        subText: {
            fontSize: 16 / fontScale,
            color: "#000000", // Neutral text color
            textAlign: "center",
            marginBottom: 20,
        },
        forgotPasswordText: {
            color: "#c62828", // Red color
            fontSize: 14 / fontScale,
            textAlign: "right",
            marginTop: 10,
        },
        rememberMeContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
        },
        rememberMeText: {
            fontSize: 14 / fontScale,
            color: "#333333", // Neutral color
            marginLeft: 8,
        },
        signInButton: {
            backgroundColor: "#c62828", // Red background
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        },
        signInButtonText: {
            color: "#FFFFFF", // White text color
            fontWeight: "bold",
            fontSize: 16 / fontScale,
        },
        signUpContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
        },
        signUpPrompt: {
            fontSize: 14 / fontScale,
            color: "#333333", // Neutral color
        },
        signUpLink: {
            fontSize: 14 / fontScale,
            color: "#c62828", // Red color
            fontWeight: "bold",
            marginLeft: 5,
        },
    });

export default SignIn;
