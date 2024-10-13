import {useState} from "react";
import {Link, router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Alert,
    Image,
    StyleSheet
} from "react-native";

import {images, icons} from "../../constants";
import {CustomButton, FormField} from "../../components";
import {getCurrentUser, signIn} from "../../libs/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";

const SignIn = () => {
    const {setUser, setIsLogged} = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
        }

        setSubmitting(true);

        try {
            await signIn(form.email, form.password);
            const result = await getCurrentUser();
            setUser(result);
            setIsLogged(true);

            Alert.alert("Success", "User signed in successfully");
            router.replace("/signUp");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setSubmitting(false);
        }
    };

    console.log("Auth signIn");
    return (
        <SafeAreaView className="bg-red-lip h-full">
            <ScrollView contentContainerStyle={{paddingBottom: 150}}>
                <View className="w-full flex justify-center h-full px-4 my-6">
                    <View className="flex items-center self-center w-64 h-20">
                        <View className="absolute w-4 h-4 rounded-full scale-x-[12] bg-black opacity-5 bottom-[-2px] "/>
                        <Image
                            source={icons.whiteLogo}
                            resizeMode="center"
                            className="w-[185px] h-[80px] self-center"
                        />
                    </View>

                    <Text
                        className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Log in to eHUST
                    </Text>

                    <FormField
                        title="Email"
                        value={form.email}
                        placeholder="Email"
                        handleChangeText={(e) => setForm({...form, email: e})}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        placeholder="Password"
                        handleChangeText={(e) => setForm({
                            ...form,
                            password: e
                        })}
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="flex justify-center pt-1 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an accounaaat?
                        </Text>
                        <Link
                            href="/signUp"
                            className="text-lg font-arialBlack text-secondary"
                        >
                            Signup
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


export default SignIn;