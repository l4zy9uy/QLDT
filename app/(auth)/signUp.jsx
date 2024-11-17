import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    ScrollView,
    Alert,
    Image,
    StyleSheet,
    useWindowDimensions,
} from "react-native";
import { Link, router } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createUser } from "../../libs/appwrite";
import { icons } from "../../constants";
import DropdownField from "../../components/DropdownField";

const SignUp = () => {
    const { fontScale, width, height } = useWindowDimensions();
    const styles = makeStyles(fontScale, width, height);
    const { setUser, setIsLogged } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "", // New field for confirm password
    });
    const [role, setRole] = useState(null);

    const submit = async () => {
        // Validation: Ensure all fields are filled and passwords match
        if (!form.username || !form.email || !form.password || !form.confirmPassword || !role) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (form.password !== form.confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        setSubmitting(true);
        try {
            const result = await createUser(form.email, form.password, form.username);
            setUser(result);
            setIsLogged(true);
            router.replace("/home");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const roleOptions = [
        { label: "Student", value: "STUDENT" },
        { label: "Lecturer", value: "LECTURER" },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                <View style={styles.innerContainer}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={icons.redLogo} // Replace with your logo
                            resizeMode="contain"
                            style={styles.logo}
                        />
                    </View>

                    {/* Welcome Text */}
                    <Text style={styles.welcomeText}>Sign Up to eHUST</Text>
                    <Text style={styles.subText}>Create your account</Text>

                    <View style={styles.nameContainer}>
                        <FormField
                            title="Ho"
                            value={form.ho}
                            placeholder="Enter your last name"
                            placeholderTextColor="#888888"
                            handleChangeText={(e) => setForm({ ...form, ho: e })}
                            otherStyles={styles.hoField}
                        />
                        <FormField
                            title="Ten"
                            value={form.ten}
                            placeholder="Enter your first name"
                            placeholderTextColor="#888888"
                            handleChangeText={(e) => setForm({ ...form, ten: e })}
                            otherStyles={styles.tenField}
                        />
                    </View>

                    {/* Email */}
                    <FormField
                        title="Email"
                        value={form.email}
                        placeholder="Enter your email"
                        placeholderTextColor="#888888"
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        keyboardType="email-address"
                        otherStyles={styles.formField}
                    />

                    {/* Password */}
                    <FormField
                        title="Password"
                        value={form.password}
                        placeholder="Enter your password"
                        placeholderTextColor="#888888"
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        secureTextEntry={true}
                        otherStyles={styles.formField}
                    />

                    {/* Confirm Password */}
                    <FormField
                        title="Confirm Password"
                        value={form.confirmPassword}
                        placeholder="Re-enter your password"
                        placeholderTextColor="#888888"
                        handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
                        secureTextEntry={true}
                        otherStyles={styles.formField}
                    />

                    {/* Role Dropdown */}
                    <DropdownField
                        title="Role"
                        value={role}
                        data={roleOptions}
                        onChange={(item) => setRole(item.value)}
                        placeholder="Select Role"
                    />

                    {/* Sign Up Button */}
                    <CustomButton
                        title="Sign Up"
                        handlePress={submit}
                        containerStyle={styles.signUpButton}
                        textStyle={styles.signUpButtonText}
                        isLoading={isSubmitting}
                    />

                    {/* Login Link */}
                    <View style={styles.loginLinkContainer}>
                        <Text style={styles.loginPrompt}>Have an account already?</Text>
                        <Link href="/signIn" style={styles.loginLink}>
                            Login
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const makeStyles = (fontScale, width, height) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#FFFFFF", // White background
        },
        innerContainer: {
            width: "90%",
            alignSelf: "center",
            marginTop: width * 0.05,
        },
        logoContainer: {
            alignItems: "center",
        },
        logo: {
            width: width * 0.618, // Responsive logo width (50% of screen width)
            height: height * 0.2, // Adjusted height (30% of screen width)
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
        formField: {
        },
        dropdown: {
            height: height * 0.06,
            paddingHorizontal: width * 0.03,
            backgroundColor: "#FFFFFF", // White background for contrast
            borderRadius: 100,
            borderColor: "#BBBBBB", // Light grey border
            borderWidth: 1.5,
        },
        dropdownPlaceholder: {
            fontSize: 12 / fontScale,
            color: "#888888", // Black text color for readability
            paddingHorizontal: width * 0.03,
        },
        dropdownText: {
            color: "#000000", // Black selected text
            fontSize: 14 / fontScale,
        },
        signUpButton: {
            backgroundColor: "#c62828", // Red background
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 20,
        },
        signUpButtonText: {
            color: "#FFFFFF", // White text
            fontWeight: "bold",
            fontSize: 16 / fontScale,
        },
        loginLinkContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
        },
        loginPrompt: {
            fontSize: 14 / fontScale,
            color: "#333333", // Neutral color
        },
        loginLink: {
            fontSize: 14 / fontScale,
            color: "#c62828", // Red link
            fontWeight: "bold",
            marginLeft: 5,
        },

        nameContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        hoField: {
            flex: 1,
            marginRight: 5, // Add spacing between fields
        },
        tenField: {
            flex: 1,
            marginLeft: 5,
        },
    });

export default SignUp;
