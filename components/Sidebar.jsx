import React, {useState} from 'react';
import {
    View,
    Text,
    Button,
    Animated,
    StyleSheet,
    Switch,
    TouchableOpacity,
} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

const Sidebar = ({slideAnim, panResponder, isVisible, toggleSidebar}) => {
    const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null); // Track radio button selection

    const toggleSwitch = () => setIsSwitchEnabled((previous) => !previous);

    const handleRadioSelect = (option) => setSelectedOption(option);

    return (
        <Animated.View
            style={[styles.sidebar, {transform: [{translateX: slideAnim}]}]}
            {...panResponder.panHandlers}
        >
            {/* Sidebar Header */}
            <View style={styles.header}>
                <Ionicons name="logo-react" size={70} color="white"/>
            </View>

            {/* Notification Switch */}
            <View style={styles.menuItem}>
                <Ionicons name="notifications-outline" size={24} color="white"/>
                <Text style={styles.menuText}>Thông báo</Text>
                <Switch
                    value={isSwitchEnabled}
                    onValueChange={toggleSwitch}
                    thumbColor={isSwitchEnabled ? "#fff" : "#f4f3f4"}
                    trackColor={{false: "#767577", true: "#81b0ff"}}
                />
            </View>

            {/* Radio Button Options */}
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleRadioSelect('summary')}
            >
                <Ionicons
                    name={
                        selectedOption === 'summary'
                            ? 'radio-button-on-outline'
                            : 'radio-button-off-outline'
                    }
                    size={24}
                    color="white"
                />
                <Text style={styles.menuText}>Nhận thông báo tổng hợp</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleRadioSelect('event')}
            >
                <Ionicons
                    name={
                        selectedOption === 'event'
                            ? 'radio-button-on-outline'
                            : 'radio-button-off-outline'
                    }
                    size={24}
                    color="white"
                />
                <Text style={styles.menuText}>Nhận thông báo từng sự kiện</Text>
            </TouchableOpacity>

            {/* Dropdown-like Timing Text */}
            <View style={styles.menuItem}>
                <Ionicons name="time-outline" size={24} color="white"/>
                <Text style={styles.menuText}>Thông báo lịch học trước</Text>
                <Text style={styles.dropdown}>15 phút</Text>
            </View>

            {/* FaceID/TouchID Option */}
            <TouchableOpacity style={styles.menuItem}>
                <MaterialCommunityIcons name="fingerprint" size={24}
                                        color="white"/>
                <Text style={styles.menuText}>Cài đặt TouchID/FaceID</Text>
            </TouchableOpacity>

            {/* Logout Option */}
            <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="log-out-outline" size={24} color="white"/>
                <Text style={styles.menuText}>Đăng xuất</Text>
            </TouchableOpacity>

            {/* Close Button */}
            <Button title="Close Sidebar" onPress={toggleSidebar}/>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>eHUST v1.1.8</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '80%',
        backgroundColor: '#b30000',
        padding: 20,
        zIndex: 5,
        elevation: 5,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    menuText: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
        fontSize: 12,
    },
    dropdown: {
        color: 'white',
        fontSize: 14,
        marginRight: 5,
    },
    footer: {
        marginTop: 'auto',
        alignItems: 'center',
        paddingVertical: 20,
    },
    footerText: {
        color: 'white',
        fontSize: 14,
    },
});

export default Sidebar;
