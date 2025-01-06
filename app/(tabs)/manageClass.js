import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import TopBar from '../../components/TopBar';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import CustomTable from '../../components/CustomTable';
import { router } from 'expo-router';

const ManageClassesScreen = () => {
    const [classCode, setClassCode] = useState('');
    const [selectedClasses, setSelectedClasses] = useState({});

    // Dữ liệu lớp học với cấu trúc mới
    const [classDetails, setClassDetails] = useState([
        {
            id: '1',
            class_id: 'CS101',
            class_name: 'Computer Science Basics',
            lecturer_name: 'Mr. John',
            student_count: 30,
            start_date: '2025-01-10',
            end_date: '2025-05-20',
            status: 'Active',
        },
        {
            id: '2',
            class_id: 'MA102',
            class_name: 'Calculus I',
            lecturer_name: 'Ms. Smith',
            student_count: 25,
            start_date: '2025-02-01',
            end_date: '2025-06-15',
            status: 'Upcoming',
        },
    ]);

    // Cập nhật tiêu đề bảng để phù hợp với cấu trúc mới
    const headers = [
        { label: 'ID Lớp', field: 'class_id' },
        { label: 'Tên Lớp', field: 'class_name' },
        { label: 'Giảng Viên', field: 'lecturer_name' },
        { label: 'Số Sinh Viên', field: 'student_count' },
        { label: 'Ngày Bắt Đầu', field: 'start_date' },
        { label: 'Ngày Kết Thúc', field: 'end_date' },
        { label: 'Trạng Thái', field: 'status' },
    ];

    const handleCreateClass = () => {
        if (classCode) {
            Toast.show({
                type: 'success',
                text1: 'Class Created',
                text2: `You have created the class: ${classCode}`,
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Creation Failed',
                text2: 'Please enter a valid class code',
            });
        }
    };

    const handleEditClass = () => {
        const selectedClassIds = Object.keys(selectedClasses).filter((id) => selectedClasses[id]);
        if (selectedClassIds.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Edit Failed',
                text2: 'Please select at least one class to edit.',
            });
            return;
        }

        // Navigate to an edit screen (replace with your actual edit flow)
        router.push(`/editClass/${selectedClassIds[0]}`); // Chuyển tới màn hình chỉnh sửa lớp học
    };

    const toggleSelection = (id) => {
        setSelectedClasses((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };

    return (
        <View style={styles.container}>
            <TopBar
                leftComponent={<Ionicons name="arrow-back-outline" size={24} color="white" />}
                centerComponent={<Text style={styles.headerText}>MANAGE CLASSES</Text>}
                rightComponent={<View />}
            />

            <ScrollView contentContainerStyle={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputWithButton}
                        placeholder="Mã lớp mới"
                        value={classCode}
                        onChangeText={setClassCode}
                    />
                    <TouchableOpacity style={styles.registerButtonInside} onPress={handleCreateClass}>
                        <Text style={styles.buttonText}>Tạo lớp học</Text>
                    </TouchableOpacity>
                </View>

                {/* Sử dụng CustomTable với cấu trúc mới */}
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
                    <TouchableOpacity style={styles.editButton} onPress={handleEditClass}>
                        <Text style={styles.buttonText}>Chỉnh sửa lớp học</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.footerLinkContainer}
                    onPress={() => router.push('/openClasses')}
                >
                    <Text style={styles.footerLink}>Thông tin danh sách các lớp mở</Text>
                </TouchableOpacity>
            </ScrollView>

            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    headerText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    formContainer: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
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
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#b30000',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    headerBox: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    selectHeaderBox: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
        alignItems: 'center',
    },
    cellBox: { width: 100, justifyContent: 'center', alignItems: 'center' },
    checkboxContainer: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cell: { textAlign: 'center', color: '#333' },
    editButton: {
        flex: 1,
        backgroundColor: '#b30000',
        paddingVertical: 10,
        marginTop: 36,
        alignItems: 'center',
        borderRadius: 24,
    },
    footerLinkContainer: { alignItems: 'center', marginTop: 16 },
    footerLink: { color: '#b30000', textDecorationLine: 'underline' },
    buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});

export default ManageClassesScreen;
