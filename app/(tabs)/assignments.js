// AssignmentListScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    StatusBar,
} from 'react-native';
import TopBar from '../../components/TopBar';
import {useNavigation, useRouter} from "expo-router"; // Reuse your custom TopBar

const assignmentsData = [
    { id: '1', title: 'Participant Exercise 20.5.2024', date: '20 thg 5', status: 'Sắp tới' },
    { id: '2', title: 'Bài tập về Ngoại Lệ', date: '16 thg 5', status: 'Quá hạn' },
    { id: '3', title: 'LAB 3: STATIC ROUTING...', date: '12 thg 5', status: 'Đã hoàn thành' },
    { id: '4', title: 'Exercise about class diagram', date: '9 thg 5', status: 'Đã hoàn thành' },
];


const AssignmentListScreen = () => {
    const [selectedTab, setSelectedTab] = useState('Sắp tới');
    const router = useRouter(); // Initialize the router

    const renderAssignment = ({ item }) => (
        <TouchableOpacity
            style={styles.assignmentCard}
            onPress={() => router.push({ pathname: 'assignmentDetail', params: { id: item.id, title: item.title, detail: item.detail } })}
        >
            <Text style={styles.assignmentTitle}>{item.title}</Text>
            <Text style={styles.assignmentDate}>{item.date}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#b30000" barStyle="light-content" />

            {/* TopBar */}
            <TopBar
                centerComponent={<Text style={styles.headerText}>Bài tập</Text>}
            />

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                {['Sắp tới', 'Quá hạn', 'Đã hoàn thành'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tab,
                            selectedTab === tab && styles.activeTab,
                        ]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedTab === tab && styles.activeTabText,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Assignment List */}
            <FlatList
                data={assignmentsData.filter(
                    (assignment) => assignment.status === selectedTab
                )}
                keyExtractor={(item) => item.id}
                renderItem={renderAssignment}
                contentContainerStyle={styles.listContainer}
            />

            {/* Bottom Navigation Placeholder */}
            <View style={styles.bottomNav}>
                <Text style={styles.navItem}>Hoạt động</Text>
                <Text style={styles.navItem}>Bài tập</Text>
                <Text style={styles.navItem}>Khảo sát</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        paddingVertical: 10,
    },
    tab: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#b30000',
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
    activeTabText: {
        color: '#b30000',
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 16,
    },
    assignmentCard: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    assignmentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    assignmentDate: {
        fontSize: 14,
        color: '#666',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    navItem: {
        fontSize: 16,
        color: '#b30000',
    },
});

export default AssignmentListScreen;
