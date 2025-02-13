// RegisterForClassScreen.js
import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import TopBar from '../../components/TopBar';
import {Ionicons} from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import CustomTable from '../../components/CustomTable';
import {useNavigation} from "expo-router"; // Import ClassTable component
import {router} from "expo-router";

const RegisterForClassScreen = () => {
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
        {
            id: '3',
            class_id: 'PH103',
            class_name: 'Physics Fundamentals',
            lecturer_name: 'Dr. Green',
            student_count: 40,
            start_date: '2025-01-15',
            end_date: '2025-05-30',
            status: 'Completed',
        },
        // Thêm lớp khác nếu cần
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

    const handleRemoveClass = () => {
        const selectedClassIds = Object.keys(selectedClasses).filter(
            (id) => selectedClasses[id]
        );
        if (selectedClassIds.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Remove Failed',
                text2: 'Please select at least one class to remove.',
            });
            return;
        }

        Alert.alert('Confirm Remove', 'Are you sure you want to remove the selected classes?', [
            { text: 'No', style: 'cancel' },
            {
                text: 'Yes',
                onPress: () => {
                    const updatedClassDetails = classDetails.filter(
                        (item) => !selectedClasses[item.id]
                    );
                    setClassDetails(updatedClassDetails);
                    setSelectedClasses({});
                    Toast.show({
                        type: 'success',
                        text1: 'Classes Removed',
                        text2: 'Selected classes have been successfully removed.',
                    });
                },
            },
        ]);
    };

    const toggleSelection = (id) => {
        setSelectedClasses((prevState) => ({ ...prevState, [id]: !prevState[id] }));
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
                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.buttonText}>Gửi đăng ký</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeButton} onPress={handleRemoveClass}>
                        <Text style={styles.buttonText}>Xóa lớp đã chọn</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.footerLinkContainer} onPress={() => router.push("/openClasses")}>
                    <Text style={styles.footerLink}>Thông tin danh sách các lớp
                        mở</Text>
                </TouchableOpacity>
            </ScrollView>

            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    headerText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white'
    },
    formContainer: {
        padding: 16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    inputContainer: {position: 'relative', width: '100%', marginBottom: 16},
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
        borderTopRightRadius: 8
    },
    headerBox: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    selectHeaderBox: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
        alignItems: 'center'
    },
    cellBox: {width: 100, justifyContent: 'center', alignItems: 'center'},
    checkboxContainer: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cell: {textAlign: 'center', color: '#333'},
    submitButton: {
        flex: 1,
        backgroundColor: '#b30000',
        paddingVertical: 10,
        marginRight: 8,
        marginTop: 36,
        alignItems: 'center',
        borderRadius: 24
    },
    removeButton: {
        flex: 1,
        backgroundColor: '#b30000',
        paddingVertical: 10,
        marginTop: 36,
        alignItems: 'center',
        borderRadius: 24
    },
    footerLinkContainer: {alignItems: 'center', marginTop: 16},
    footerLink: {color: '#b30000', textDecorationLine: 'underline'},
    buttonText: {color: 'white', fontWeight: 'bold', textAlign: 'center'},
});

export default RegisterForClassScreen;
