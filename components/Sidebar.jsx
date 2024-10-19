import React, { useState } from 'react';
import { View, Button, Animated, StyleSheet } from 'react-native';

const Sidebar = ({ toggleSidebar, isVisible, slideAnim }) => {
    return (
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
            <Button title="Option 1" onPress={() => console.log('Option 1')} />
            <Button title="Option 2" onPress={() => console.log('Option 2')} />
            <Button title="Option 3" onPress={() => console.log('Option 3')} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 300,
        backgroundColor: '#f8f8f8',
        padding: 20,
        zIndex: 2, // To make sure it appears over the profile content
    },
});

export default Sidebar;
