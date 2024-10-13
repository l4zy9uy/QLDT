import {useState} from "react";
import {Link, router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {View, Text, ScrollView, Dimensions, Alert, Image} from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import {icons, images} from "../../constants";
import {createUser} from "../../libs/appwrite";
import {CustomButton, FormField} from "../../components";
import {useGlobalContext} from "../../context/GlobalProvider";
import Onboarding from "../../components/Onboarding";
const SignUp = () => {
    const {setUser, setIsLogged} = useGlobalContext();

    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const submit = async () => {
        if (form.username === "" || form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
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

    const data = [
        {label: "Student", value: "STUDENT"},
        {label: "Lecturer", value: "LECTURER"},
    ]
    const [value, setValue] = useState(null);

    console.log("Auth signUp");
    return (
        <SafeAreaView className="bg-red-lip h-full">
            <ScrollView contentContainerStyle={{paddingBottom: 150}}
            keyboardShouldPersistTaps="always">
                <View
                    className="w-full flex justify-center h-full px-4 my-6"

                >
                    <View className="flex items-center self-center w-64 h-20">
                        <View
                            className="absolute w-4 h-4 rounded-full scale-x-[12] bg-black opacity-5 bottom-[-2px] "/>
                        <Image
                            source={icons.whiteLogo}
                            resizeMode="center"
                            className="w-[185px] h-[80px] self-center"
                        />
                    </View>

                    <Text
                        className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Sign Up to eHUST
                    </Text>

                    <View className="flex-row justify-between">
                        <FormField
                            title="Ho"
                            value={form.username}
                            placeholder="Ho"
                            handleChangeText={(e) => setForm({
                                ...form,
                                username: e
                            })}
                            otherStyles="mt-7 w-1/4 flex-[1] mr-2"
                        />

                        <FormField
                            title="Ten"
                            value={form.username}
                            placeholder="Ten"
                            handleChangeText={(e) => setForm({
                                ...form,
                                username: e
                            })}
                            otherStyles="mt-7 flex-[1]"
                        />
                    </View>

                    <FormField
                        title="Email"
                        value={form.email}
                        placeholder="Email"
                        handleChangeText={(e) => setForm({...form, email: e})}
                        otherStyles="mt-2"
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
                        otherStyles="mt-2"
                    />


                    <Dropdown data={data}
                              labelField="label"
                              valueField="value"
                              value={value}
                              onChange={item => {
                                  setValue(item.value);
                              }}
                              placeholder="Role"
                              placeholderStyle={{color: "white"}}
                              iconColor="white"
                              activeColor="white"
                              selectedTextStyle={{color: "white"}}
                              className="mt-2 w-full h-16 px-4 bg-transparent rounded-2xl border-2 border-white focus:border-secondary flex flex-row items-center"
                    />


                    <CustomButton
                        title="Sign Up"
                        handlePress={submit}
                        containerStyles="mt-7 mx-auto w-1/2 h-20"
                        textStyles="text-red-lip"
                        isLoading={isSubmitting}
                    />

                    <View className="flex justify-center pt-5 flex-row gap-2 mx-auto">
                        <Text className="text-lg text-gray-100 sm:font-sm">
                            Have an account already?
                        </Text>
                        <Link
                            href="/signIn"
                            className="text-lg font-psemibold text-secondary"
                        >
                            Login
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;