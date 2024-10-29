// HomeScreen.js
import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    FlatList,
    Dimensions,
} from 'react-native';
import SquareButton from '../../components/SquareButton';
import { MaterialIcons } from '@expo/vector-icons';
import TopBar from '../../components/TopBar';
import { icons } from '../../constants';
import Entypo from '@expo/vector-icons/Entypo';

const numColumns = 2; // Number of buttons per row

const data = [
    {
        key: '1',
        title: 'Thời khóa biểu',
        subtitle: 'Tra cứu thời khóa biểu, lịch thi',
        icon: <MaterialIcons name="schedule" size={40} color="#c62828" />,
    },
    {
        key: '2',
        title: 'Đồ án',
        subtitle: 'Thông tin các đồ án',
        icon: <MaterialIcons name="assignment" size={40} color="#c62828" />,
    },
    {
        key: '3',
        title: 'Thông báo tin tức',
        subtitle: 'Các thông báo quan trọng',
        icon: <MaterialIcons name="notifications" size={40} color="#c62828" />,
    },
    {
        key: '4',
        title: 'Kết quả học tập',
        subtitle: 'Thông tin kết quả học tập',
        icon: <MaterialIcons name="assessment" size={40} color="#c62828" />,
    },
    {
        key: '5',
        title: 'Lớp sinh viên',
        subtitle: 'Thông tin về lớp của sv',
        icon: <MaterialIcons name="people" size={40} color="#c62828" />,
    },
    {
        key: '6',
        title: 'Tiện ích',
        subtitle: 'Sổ tay sinh viên, bản đồ',
        icon: <MaterialIcons name="menu-book" size={40} color="#c62828" />,
    },
    {
        key: '7',
        title: 'Biểu mẫu online',
        subtitle: 'Bảng điểm, chứng nhận sv giấy giới thiệu',
        icon: <MaterialIcons name="description" size={40} color="#c62828" />,
    },
    {
        key: '8',
        title: 'Học phí',
        subtitle: 'Thông tin chi tiết về học phí',
        icon: <MaterialIcons name="attach-money" size={40} color="#c62828" />,
    },
];

// Function to format data for the grid layout
const formatData = (data, numColumns) => {
    const totalRows = Math.floor(data.length / numColumns);
    let lastRowElements = data.length - totalRows * numColumns;

    // Fill remaining spaces with blank elements to make a complete row
    while (lastRowElements !== 0 && lastRowElements !== numColumns) {
        data.push({ key: `blank-${lastRowElements}`, empty: true });
        lastRowElements++;
    }
    return data;
};

const HomeScreen = () => {
    const renderItem = ({ item }) => {
        if (item.empty) {
            return <View style={[styles.item, styles.invisibleItem]} />;
        }
        return (
            <SquareButton
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onPress={() => {}}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />

            <TopBar
                leftComponent={<Image source={icons.BKLogo} style={styles.logo} resizeMode="contain" />}
                centerComponent={<Image source={icons.whiteLogo} style={styles.eHustLogo} resizeMode="contain" />}
            />

            <FlatList
                data={formatData(data, numColumns)}
                renderItem={renderItem}
                numColumns={numColumns}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.flatListContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    flatListContainer: {
        padding: 10,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 30,
        marginTop: 40,
    },
    eHustLogo: {
        width: 70,
        height: 70,
    },
    item: {
        flex: 1,
        margin: 10,
    },
    invisibleItem: {
        backgroundColor: 'transparent',
    },
});

export default HomeScreen;
