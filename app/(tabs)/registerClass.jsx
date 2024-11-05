// RegisterForClassScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import TopBar from '../../components/TopBar';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import CustomTable from '../../components/CustomTable';
import {useNavigation} from "expo-router"; // Import ClassTable component

const RegisterForClassScreen = () => {
    const [classCode, setClassCode] = useState('');
    const [selectedClasses, setSelectedClasses] = useState({});

    const [classDetails, setClassDetails] = useState([
        { id: '1', classCode: 'CS101', linkedClassCode: 'CS101-A', className: 'Computer Science Basics', teacher: 'Mr. John', time: 'Mon, 10:00 AM' },
        { id: '2', classCode: 'MA102', linkedClassCode: 'MA102-B', className: 'Calculus I', teacher: 'Ms. Smith', time: 'Wed, 2:00 PM' },
        { id: '3', classCode: 'PH103', linkedClassCode: 'PH103-A', className: 'Physics Fundamentals', teacher: 'Dr. Green', time: 'Tue, 11:00 AM' },
        { id: '4', classCode: 'CH104', linkedClassCode: 'CH104-B', className: 'Intro to Chemistry', teacher: 'Dr. Brown', time: 'Thu, 1:30 PM' },
        { id: '5', classCode: 'BI105', linkedClassCode: 'BI105-C', className: 'Biology I', teacher: 'Ms. Taylor', time: 'Fri, 9:00 AM' },
        { id: '6', classCode: 'EC106', linkedClassCode: 'EC106-D', className: 'Economics Basics', teacher: 'Mr. White', time: 'Mon, 3:00 PM' },
        { id: '7', classCode: 'HS107', linkedClassCode: 'HS107-E', className: 'World History', teacher: 'Mrs. Adams', time: 'Wed, 10:30 AM' },
        { id: '8', classCode: 'PS108', linkedClassCode: 'PS108-F', className: 'Psychology 101', teacher: 'Ms. Martin', time: 'Thu, 4:00 PM' },
        { id: '9', classCode: 'EN109', linkedClassCode: 'EN109-G', className: 'English Literature', teacher: 'Mr. Thomas', time: 'Fri, 11:00 AM' },
        { id: '10', classCode: 'MT110', linkedClassCode: 'MT110-H', className: 'Mathematics II', teacher: 'Dr. Jones', time: 'Tue, 2:30 PM' },
        { id: '11', classCode: 'CS201', linkedClassCode: 'CS201-I', className: 'Data Structures', teacher: 'Mr. John', time: 'Mon, 1:00 PM' },
        { id: '12', classCode: 'MA202', linkedClassCode: 'MA202-J', className: 'Calculus II', teacher: 'Ms. Smith', time: 'Wed, 4:00 PM' },
        { id: '13', classCode: 'PH203', linkedClassCode: 'PH203-K', className: 'Advanced Physics', teacher: 'Dr. Green', time: 'Tue, 10:00 AM' },
        { id: '14', classCode: 'CH204', linkedClassCode: 'CH204-L', className: 'Organic Chemistry', teacher: 'Dr. Brown', time: 'Thu, 3:30 PM' },
        { id: '15', classCode: 'BI205', linkedClassCode: 'BI205-M', className: 'Biology II', teacher: 'Ms. Taylor', time: 'Fri, 8:00 AM' },
    ]);

    const headers = [
        { label: 'Mã lớp', field: 'classCode' },
        { label: 'Mã lớp kèm', field: 'linkedClassCode' },
        { label: 'Tên lớp', field: 'className' },
        { label: 'Giáo viên', field: 'teacher' },
        { label: 'Thời gian', field: 'time' },
    ];

    const handleRegister = () => {
        if (classCode) {
            Toast.show({
                type: 'success',
                text1: 'Registration Successful',
                text2: `You have registered for: ${classCode}`,
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Registration Failed',
                text2: 'Please enter a valid class code',
            });
        }
    };

    const handleSendRegistration = () => {
        Toast.show({
            type: 'info',
            text1: 'Sending registration...',
        });
    };

    const handleRemoveClass = () => {
        const selectedClassIds = Object.keys(selectedClasses).filter(id => selectedClasses[id]);
        if (selectedClassIds.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Remove Failed',
                text2: 'Please select at least one class to remove.',
            });
            return;
        }

        Alert.alert(
            'Confirm Remove',
            'Are you sure you want to remove the selected classes?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: () => {
                        const updatedClassDetails = classDetails.filter(item => !selectedClasses[item.id]);
                        setClassDetails(updatedClassDetails);
                        setSelectedClasses({});
                        Toast.show({
                            type: 'success',
                            text1: 'Classes Removed',
                            text2: 'Selected classes have been successfully removed.',
                        });
                    },
                },
            ]
        );
    };

    const toggleSelection = (id) => {
        setSelectedClasses(prevState => ({ ...prevState, [id]: !prevState[id] }));
    };
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TopBar
                leftComponent={<Ionicons name="arrow-back-outline" size={24} color="white" />}
                centerComponent={<Text style={styles.headerText}>REGISTER FOR CLASS</Text>}
                rightComponent={<View />}
                onLeftPress={() => navigation.goBack()}
            />

            <ScrollView contentContainerStyle={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputWithButton}
                        placeholder="Mã lớp"
                        value={classCode}
                        onChangeText={setClassCode}
                    />
                    <TouchableOpacity style={styles.registerButtonInside} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>

                {/* Use ClassTable with custom headers and data */}
                <CustomTable
                    data={classDetails}
                    headers={headers}
                    hasSelected={true}
                    selectedRows={selectedClasses}
                    onToggleRow={toggleSelection}
                    customStyles={{
                        tableHeader: styles.tableHeader,
                        headerBox: styles.headerBox,
                        tableRow: styles.tableRow,
                        cellBox: styles.cellBox,
                        checkbox: styles.checkbox,
                        headerText: styles.headerText,
                        cellText: styles.cell,
                    }}
                />

                <View style={styles.row}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSendRegistration}>
                        <Text style={styles.buttonText}>Gửi đăng ký</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeButton} onPress={handleRemoveClass}>
                        <Text style={styles.buttonText}>Xóa lớp đã chọn</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer Link */}
                <TouchableOpacity style={styles.footerLinkContainer}>
                    <Text style={styles.footerLink}>Thông tin danh sách các lớp mở</Text>
                </TouchableOpacity>
            </ScrollView>

            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    headerText: { fontSize: 12, fontWeight: 'bold', color: 'white' },
    formContainer: { padding: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    inputContainer: { position: 'relative', width: '100%', marginBottom: 16 },
    inputWithButton: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: '#b30000',
        paddingLeft: 8,
        paddingRight: 70,
        borderRadius: 24,
    },
    registerButtonInside: {
        position: 'absolute',
        right: 0,
        height: 45,
        backgroundColor: '#b30000',
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderRadius: 24,
    },
    tableHeader: { flexDirection: 'row', backgroundColor: '#b30000', borderTopLeftRadius: 8, borderTopRightRadius: 8 },
    headerBox: { width: 100, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 },
    selectHeaderBox: { width: 100, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 },
    tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd', paddingVertical: 10, alignItems: 'center' },
    cellBox: { width: 100, justifyContent: 'center', alignItems: 'center' },
    checkboxContainer: { width: 100, alignItems: 'center', justifyContent: 'center' },
    cell: { textAlign: 'center', color: '#333' },
    submitButton: { flex: 1, backgroundColor: '#b30000', paddingVertical: 10, marginRight: 8, marginTop: 36, alignItems: 'center', borderRadius: 24 },
    removeButton: { flex: 1, backgroundColor: '#b30000', paddingVertical: 10, marginTop: 36, alignItems: 'center', borderRadius: 24 },
    footerLinkContainer: { alignItems: 'center', marginTop: 16 },
    footerLink: { color: '#b30000', textDecorationLine: 'underline' },
    buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});

export default RegisterForClassScreen;
