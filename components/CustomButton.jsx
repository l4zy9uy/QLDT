import {ActivityIndicator, Text, TouchableOpacity} from "react-native";
const CustomButton = ({
                          title,
                          handlePress,
                          containerStyles,
                          textStyles,
                          isLoading,
                      }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-white rounded-full flex flex-row ${containerStyles} justify-center items-center ${
                isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading}
        >
            <Text
                className={`text-primary font-semibold text-lg ${textStyles}`}>
                {title}
            </Text>

            {isLoading && (
                <ActivityIndicator
                    animating={isLoading}
                    color="#fff"
                    size="small"
                    className="ml-2"
                />
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;