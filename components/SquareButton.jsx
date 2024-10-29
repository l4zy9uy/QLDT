// SquareButton.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const SquareButton
 = ({ icon, title, subtitle, onPress }) => {
    return (
        <View style={styles.box}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <View style={styles.iconContainer}>{icon}</View>
            </TouchableOpacity>
            {/*<Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        width: '50%',
        aspectRatio: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
        marginVertical: 10,
    },
    iconContainer: {
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    },
    subtitle: {
        color: 'gray',
        textAlign: 'center',
        marginTop: 5,
    },
});

export default SquareButton
;
