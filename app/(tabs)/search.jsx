import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

const SearchScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.text}>Search Screen</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default SearchScreen;
