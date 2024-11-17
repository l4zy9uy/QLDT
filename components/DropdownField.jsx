import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import {useGlobalContext} from "../context/GlobalProvider";

const DropdownField = ({
                           title,
                           value,
                           data,
                           onChange,
                           placeholder,
                           placeholderStyle = {},
                           ...props
                       }) => {
    const {fontScale, width, height} = useGlobalContext();
    const styles = makeStyles(fontScale, width, height);

    return (
        <View style={styles.container}>
            {title && <Text style={styles.label}>{title}</Text>}
            <Dropdown
                data={data}
                value={value}
                onChange={onChange}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                placeholderStyle={[styles.placeholder]}
                selectedTextStyle={styles.selectedText}
                style={styles.dropdown}
                {...props}
            />
        </View>
    );
};

const makeStyles = (fontScale, width, height) =>
    StyleSheet.create({
        container: {
            marginVertical: 10,
        },
        label: {
            fontSize: 14 / fontScale,
            color: "#c62828", // Red for label
            fontWeight: "600",
            marginBottom: 5,
            paddingHorizontal: width * 0.03 * 2,
        },
        dropdown: {
            height: height * 0.06,
            paddingHorizontal: width * 0.03,
            backgroundColor: "#FFFFFF", // White background
            borderRadius: 100,
            borderColor: "#BBBBBB", // Light grey border
            borderWidth: 1.5,
            justifyContent: "center",
        },
        placeholder: {
            color: "#888888", // Placeholder text color
            fontSize: 12 / fontScale,
            paddingHorizontal: width * 0.03,

        },
        selectedText: {
            color: "#000000", // Selected text color
            fontSize: 12 / fontScale,
            paddingHorizontal: width * 0.03,
        },
        dropdownContainer: {
            borderWidth: 1,
            width: width * 0.02,
        },
    });

export default DropdownField;
