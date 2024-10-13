import "react-native-url-polyfill/auto";
import {router, SplashScreen, Stack, useRouter} from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font"
import GlobalProvider from "../context/GlobalProvider";
import Onboarding from "../components/Onboarding";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "ArialBlack": require("../assets/fonts/ArialBlack.ttf"),
        "ArialBold": require("../assets/fonts/ArialBold.ttf"),
        "ArialItalic": require("../assets/fonts/ArialItalic.ttf"),
        "ArialLight": require("../assets/fonts/ArialLight.ttf"),
        "ArialMedium": require("../assets/fonts/ArialMedium.ttf"),
    });

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
            router.push("/signIn")
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded) {
        return null;
    }

    if (!fontsLoaded && !error) {
        return null;
    }



    console.log("App layout");
    return (
        <GlobalProvider>
            {/*<Stack>*/}
            {/*    <Stack.Screen name="(auth)" options={{ headerShown: false }} />*/}
            {/*</Stack>*/}
            <Stack>
                {/*<Stack.Screen name="(tabs)" options={{ headerShown: false }} />*/}
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                {/*<Stack.Screen name="index" options={{ headerShown: false }} />*/}
            </Stack>
        </GlobalProvider>
    );
};

export default RootLayout;