// TopBar.js
import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

const TopBar = ({
                    leftComponent,      // Custom element or icon for the left
                    centerComponent,    // Custom element or icon for the center
                    rightComponent,     // Custom element or icon for the right
                    iconContainerStyle, // Custom styles for individual icon containers
                }) => {
    return (
        <View style={styles.topBar}>
            {/* Left Component */}
            <View style={styles.iconContainer}>
                {leftComponent}
            </View>

            {/* Center Component */}
            <View style={[styles.iconContainer, iconContainerStyle]}>
                {centerComponent}
            </View>

            {/* Right Component */}
            <View style={[styles.iconContainer, iconContainerStyle]}>
                {rightComponent}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        backgroundColor: '#b30000',
        height: 80, // Fixed height for the top bar
        paddingTop: StatusBar.currentHeight || 20,
        width: '100%',
    },
    iconContainer: {
        flex: 1, // Each container takes equal space
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
});

export default TopBar;
