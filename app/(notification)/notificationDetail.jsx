import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useLocalSearchParams, useNavigation} from "expo-router";
import TopBar from "../../components/TopBar";
import AntDesign from "@expo/vector-icons/AntDesign";

const NotificationDetail = () => {
    const {notification} = useLocalSearchParams();
    console.log(notification);
    console.log({notification});
    const parsedNotification = JSON.parse(notification); // Parse the JSON string
    console.log(parsedNotification);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent
                       barStyle="light-content"/>

            <TopBar
                leftComponent={<AntDesign name="arrowleft" size={24}
                                          color="white"/>}
                centerComponent={<Text style={styles.eHustLogo}>Thông
                    báo</Text>}
                onLeftPress={() => navigation.goBack()}
            />
            <Text style={styles.title}>{parsedNotification.title}</Text>
            <Text style={styles.date}>{parsedNotification.date}</Text>
            <Text
                style={styles.description}>{parsedNotification.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    date: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
    },
});

export default NotificationDetail;
