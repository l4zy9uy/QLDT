import React from 'react';
import {Tabs} from "expo-router";
import Home from "./home";
import SearchScreen from "./search";
import ProfileScreen from "./profile";
import {TabBar} from "../../components/TabBar";

const DrawerLayout = () => {
    return (
        <Tabs tabBar={props => <TabBar {...props} />}>
            <Tabs.Screen name="home" options={{title: 'Home', headerShown: false}} />
            <Tabs.Screen name="search" options={{title: 'Search', headerShown: false}} />
            <Tabs.Screen name="profile" options={{title: 'Profile', headerShown: false}} />
        </Tabs>
    );
}


export default DrawerLayout;