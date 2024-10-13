import {useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Pressable
} from "react-native";

import {icons} from "../constants";

const FormField = ({
                       title,
                       value,
                       placeholder,
                       handleChangeText,
                       otherStyles,
                       ...props
                   }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <View
                className="w-full h-16 px-4 bg-transparent rounded-2xl border-2 border-white focus:border-orange-900 flex flex-row items-center">
                <TextInput
                    className="flex-1 text-white font-arialBlack text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="white"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                    //blurOnSubmit={false}
                    {...props}
                />

                {title === "Password" && (
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </Pressable>
                )}
            </View>
        </View>
    );
};

export default FormField;