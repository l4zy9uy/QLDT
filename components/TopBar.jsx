import React from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const TopBar = ({
                    leftComponent,
                    centerComponent,
                    rightComponent,
                    iconContainerStyle,
                    leftFlex = 1,
                    centerFlex = 3,
                    rightFlex = 1,
                    onLeftPress, // Add a prop for handling left component press
                }) => {


    const isArrowIcon = React.isValidElement(leftComponent) &&
        leftComponent.type === AntDesign &&
        leftComponent.props.name === 'arrowleft';

    return (
        <View style={styles.topBar}>
            {/* Left Component */}
            <View style={[styles.iconContainer, {flex: leftFlex}]}>
                {isArrowIcon ? (
                    <TouchableOpacity onPress={onLeftPress}>
                        {leftComponent}
                    </TouchableOpacity>
                ) : (
                    leftComponent
                )}
            </View>

            {/* Center Component */}
            <View
                style={[styles.iconContainer, iconContainerStyle, {flex: centerFlex}]}>
                {centerComponent}
            </View>

            {/* Right Component */}
            <View
                style={[styles.iconContainer, iconContainerStyle, {flex: rightFlex}]}>
                {rightComponent}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {
        display: "flex",
        flexDirection: 'row',
        backgroundColor: '#b30000',
        height: 80, // Fixed height for the top bar
        paddingTop: StatusBar.currentHeight || 20,
        width: '100%',
    },
    iconContainer: {
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
});

export default TopBar;
