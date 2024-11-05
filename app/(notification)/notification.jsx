import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import TopBar from "../../components/TopBar";
import AntDesign from '@expo/vector-icons/AntDesign';
import {Link} from "expo-router";

const notifications = [
    {
        id: '1',
        title: 'SEKISHO JOB FAIR 2024',
        date: '29/10/2024',
        description: 'Dành cho sinh viên toàn Đại học tất cả các khóa',
    },
    {
        id: '2',
        title: 'SEKISHO JOB FAIR 2024',
        date: '29/10/2024',
        description: 'Cơ hội việc làm và thực tập tại NHẬT BẢN',
    },
    {
        id: '3',
        title: '[SHCD] Chương trình chia sẻ kinh nghiệm viết CV và kỹ năng phỏng vấn với doanh nghiệp',
        date: '16/10/2024',
        description: 'Chương trình chỉ dành cho sinh viên năm thứ 3, 4 và năm cuối',
    },
    {
        id: '4',
        title: 'Thầy Gửi Team Code lớp Lưu Trữ và Xử Lý Dữ Liệu Lớn',
        date: '12/09/2024',
        description: '',
    },
];

const NotificationTab = () => {
    const renderItem = ({ item }) => {
        return (
            <Link href={{
                pathname: `/notificationDetail`,
                params: { notification: JSON.stringify(item) },
            }} asChild>
                <TouchableOpacity
                    style={styles.notificationCard}
                >
                    <Text style={styles.source}>eHUST</Text>
                    <Text style={styles.date}>{item.date}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.detailsLink}>Chi tiết</Text>
                </TouchableOpacity>
            </Link>
        )
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />

            <TopBar
                leftComponent={<AntDesign name="arrowleft" size={24} color="white" />}
                centerComponent={<Text style={styles.eHustLogo}>Thông báo</Text>}
            />
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    notificationCard: {
        backgroundColor: '#f5f5f5',
        margin: 10,
        padding: 15,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    source: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 12,
    },
    date: {
        position: 'absolute',
        right: 15,
        top: 10,
        color: '#888',
        fontSize: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    description: {
        fontSize: 14,
        marginTop: 5,
    },
    detailsLink: {
        color: 'blue',
        fontSize: 14,
        marginTop: 10,
    },
    eHustLogo: {
        color: 'white',
    },
});

export default NotificationTab;
