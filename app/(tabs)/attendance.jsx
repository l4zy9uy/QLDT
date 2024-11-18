import React, { useState } from "react";
import { View, StatusBar, Image, StyleSheet, Text, ScrollView } from "react-native";
import TopBar from "../../components/TopBar";
import CustomTable from "../../components/CustomTable";
import { icons } from "../../constants";
import {useGlobalContext} from "../../context/GlobalProvider";

// Sample Data for Attendance
const initialData = [
    { id: "1", name: "Anderson, Cooper", studentId: "S123" },
    { id: "2", name: "Barry, Holly", studentId: "S124" },
    { id: "3", name: "Branson, Tom", studentId: "S125" },
    { id: "4", name: "Brosnan, Pierce", studentId: "S126" },
    { id: "5", name: "Clarkson, Kelly", studentId: "S127" },
    { id: "6", name: "Cooper, Bradly", studentId: "S128" },
    { id: "7", name: "Diaz, Cameron", studentId: "S129" },
    { id: "8", name: "Eddison, Thomas", studentId: "S130" },
    { id: "9", name: "Flinn, William", studentId: "S131" },
    { id: "10", name: "Hyak, Salma", studentId: "S132" },
];

const AttendanceSheet = () => {
    const [data, setData] = useState(initialData);
    const [selectedRows, setSelectedRows] = useState({});

    const { fontScale, width, height } = useGlobalContext();
    const styles = makeStyles(fontScale, width, height);

    // Toggle checkbox selection
    const toggleRowSelection = (id) => {
        setSelectedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Table Headers
    const headers = [
        { label: "Order", field: "order" },
        { label: "Name", field: "name" },
        { label: "Student ID", field: "studentId" },
    ];

    // Add Order Number to Data
    const dataWithOrder = data.map((item, index) => ({
        ...item,
        order: index + 1, // Add order number starting from 1
    }));

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                translucent
                barStyle="light-content"
            />

            {/* TopBar with eHUST Logo */}
            <TopBar
                centerComponent={
                    <Image source={icons.whiteLogo} style={styles.eHustLogo} resizeMode="contain" />
                }
            />

            {/* Attendance Title */}
            <Text style={styles.title}>Attendance for: {new Date().toLocaleDateString()}</Text>

            {/* Scrollable Table */}
            <ScrollView horizontal>
                <View style={styles.tableContainer}>
                    <CustomTable
                        data={dataWithOrder}
                        headers={headers}
                        hasSelected={true}
                        selectedRows={selectedRows}
                        onToggleRow={toggleRowSelection}
                        customStyles={styles.tableStyles}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const makeStyles = (fontScale, width, height)  => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 16,
    },
    eHustLogo: {
        width: 70,
        height: 70,
    },
    title: {
        fontSize: 18 / fontScale,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginVertical: 10,
    },
    tableContainer: {
        flex: 1,
        alignItems: "center", // Center the table horizontally
        paddingVertical: 10,
    },
    tableStyles: {
        tableHeader: {
            backgroundColor: "#b30000", // Primary red for header
        },
        headerText: {
            color: "white",
            fontWeight: "bold",
        },
        cellText: {
            color: "#333",
            textAlign: "center", // Center align text inside the cells
        },
        checkbox: {
            marginHorizontal: 20,
        },
    },
});

export default AttendanceSheet;
