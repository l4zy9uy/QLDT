// AttendanceSheet.js
import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import TopBar from "../../components/TopBar";
import { icons } from "../../constants";

// Sample Data for Attendance
const initialData = [
    { id: '1', name: 'Anderson, Cooper', status: 'present' },
    { id: '2', name: 'Barry, Holly', status: 'present' },
    { id: '3', name: 'Branson, Tom', status: 'present' },
    { id: '4', name: 'Brosnan, Pierce', status: 'absent' },
    { id: '5', name: 'Clarkson, Kelly', status: 'present' },
    { id: '6', name: 'Cooper, Bradly', status: 'present' },
    { id: '7', name: 'Diaz, Cameron', status: 'absent' },
    { id: '8', name: 'Eddison, Thomas', status: 'present' },
    { id: '9', name: 'Flinn, William', status: 'present' },
    { id: '10', name: 'Hyak, Salma', status: 'absent' },
];

const AttendanceSheet = () => {
    const [data, setData] = useState(initialData);

    // Toggle status between 'present' and 'absent'
    const toggleStatus = (id) => {
        const updatedData = data.map((item) =>
            item.id === id
                ? { ...item, status: item.status === 'present' ? 'absent' : 'present' }
                : item
        );
        setData(updatedData);
    };

    // Render each row of the attendance sheet
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            {/* Name Box */}
            <View style={styles.nameBox}>
                <Text style={styles.nameText}>{item.name}</Text>
            </View>

            {/* Status Box */}
            <View style={styles.statusBox}>
                <TouchableOpacity onPress={() => toggleStatus(item.id)}>
                    {item.status === 'present' ? (
                        <AntDesign name="checkcircle" size={24} color="green" />
                    ) : (
                        <AntDesign name="closecircle" size={24} color="red" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />

            <TopBar
                centerComponent={
                    <Image source={icons.whiteLogo} style={styles.eHustLogo} resizeMode="contain" />
                }
            />

            {/* Header Row */}
            <View style={styles.header}>
                <View style={styles.nameBox}>
                    <Text style={styles.headerText}>Name</Text>
                </View>
                <View style={styles.statusBox}>
                    <Text style={styles.headerText}>Status</Text>
                </View>
            </View>

            {/* Attendance List */}
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 255, 0, 0.3)', // Light green background for debugging
        borderColor: 'red', // Red border for visibility
        borderWidth: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#f0f0f0',
        borderColor: 'red', // Red border for visibility
        borderWidth: 2,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    list: {
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    nameBox: {
        flex: 2, // Take up more space for the name
        padding: 10,
        justifyContent: 'center',
    },
    statusBox: {
        flex: 1, // Smaller box for the status icon
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 16,
        color: '#333',
    },
    eHustLogo: {
        width: 70,
        height: 70,
    },
});

export default AttendanceSheet;
