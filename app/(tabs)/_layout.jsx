import React, {useEffect, useState} from 'react';
import {Tabs} from "expo-router";
import Home from "./home";
import SearchScreen from "./search";
import ProfileScreen from "./profile";
import {TabBar} from "../../components/TabBar";
import * as Font from 'expo-font';
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {StyleSheet} from 'react-native'
import AntDesign from "@expo/vector-icons/AntDesign";
const DrawerLayout = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false); // Track font loading

    // Load fonts asynchronously
    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                ...MaterialCommunityIcons.font, // Preload MaterialCommunityIcons font
                ...MaterialIcons.font, // Preload MaterialIcons font
                ...AntDesign.font,
            });
            console.log("Font loaded");
            setFontsLoaded(true); // Set state when fonts are loaded
        };

        loadFonts();
    }, []);
    if(fontsLoaded) {
        return (
            <Tabs tabBar={props => <TabBar {...props} />}>
                <Tabs.Screen name="home" options={{title: 'Home', headerShown: false}} />
                <Tabs.Screen name="search" options={{title: 'Search', headerShown: false}} />
                <Tabs.Screen name="profile" options={{title: 'Profile', headerShown: false}} />
                <Tabs.Screen name="registerClass" options={{title: 'RegisterClass', headerShown: false}} />
                <Tabs.Screen name="editClass" options={{title: 'EditClass', headerShown: false}} />
                <Tabs.Screen name="survey" options={{title: 'SurveyClass', headerShown: false}} />
                <Tabs.Screen name="assignments" options={{title: 'AssignmentsList', headerShown: false}} />
                <Tabs.Screen name="assignmentDetail" options={{title: 'AssigmentDetail', headerShown: false}} />
                <Tabs.Screen name="attendance" options={{title: 'AttendanceDetail', headerShown: false}} />
                <Tabs.Screen name="notification" options={{title: 'Notification', headerShown: false}} />
            </Tabs>
        );
    }
}



export default DrawerLayout;