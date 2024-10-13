import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import Onboarding from "../components/Onboarding";

/*const Welcome = () => {
    /!*const { loading, isLogged } = useGlobalContext();

    if (!loading && isLogged) return <Redirect href="/home" />;*!/
    const handleOnboardingComplete = () => {
        router.push("/signIn"); // Navigate to SignIn after onboarding is done
    };
    console.log("App index");
    return (
        <Onboarding onComplete={handleOnboardingComplete} />
    );
};*/

//export default Welcome;