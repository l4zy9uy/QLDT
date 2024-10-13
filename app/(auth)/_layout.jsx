import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
/*    const { loading, isLogged } = useGlobalContext();

    if (!loading && isLogged) return <Redirect href="/home" />;*/

    console.log("Auth layout");
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="signIn"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="signUp"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>

            <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
};

export default AuthLayout;