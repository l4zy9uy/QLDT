import React from 'react';
import { Stack } from "expo-router";



const  NotiLayout = () => {
    return (
        <>
            <Stack >
                <Stack.Screen name="notification" options={{ headerShown: false }} />
                <Stack.Screen name="notificationDetail" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}

export default NotiLayout;