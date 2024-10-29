// RegisterForClassScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../../components/TopBar'; // Reuse your TopBar component
import { Ionicons } from '@expo/vector-icons'; // Icons for buttons if needed

const RegisterForClassScreen = () => {
    const [classCode, setClassCode] = useState('');
    const [students, setStudents] = useState(''); // Example state for student data

    const handleRegister = () => {
        alert(`Registered for: ${classCode}`);
    };

    const handleSendRegistration = () => {
        alert('Sending registration...');
    };

    const handleRemoveClass = () => {
        alert('Class removed!');
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar
                leftComponent={<Ionicons name="arrow-back-outline" size={24} color="white" />}
                centerComponent={<Text style={styles.headerText}>REGISTER FOR CLASS</Text>}
                rightComponent={<View />} // Optional empty right component
            />

            <ScrollView contentContainerStyle={styles.formContainer}>
                {/* Input for Class Code */}
                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mã lớp"
                        value={classCode}
                        onChangeText={setClassCode}
                    />
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>

                {/* Labels */}
                <View style={styles.row}>
                    <View style={styles.box}>
                        <Text style={styles.label}>Mã lớp</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.label}>Mã lớp kèm</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.label}>Tên lớp</Text>
                    </View>
                </View>

                {/* Student Data */}
                <TextInput
                    style={styles.textArea}
                    placeholder="Sinh viên chưa đăng ký lớp này"
                    value={students}
                    multiline
                    onChangeText={setStudents}
                />

                {/* Submit and Remove Buttons */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSendRegistration}>
                        <Text style={styles.buttonText}>Gửi đăng ký</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeButton} onPress={handleRemoveClass}>
                        <Text style={styles.buttonText}>Xóa lớp</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer Link */}
                <TouchableOpacity>
                    <Text style={styles.footerLink}>Thông tin danh sách các lớp mở</Text>
                </TouchableOpacity>
            </ScrollView>
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
        justifyContent: 'space-between', // Distribute boxes evenly
        alignItems: 'center', // Align content in the center vertically
        marginBottom: 12, // Space between rows
    },
    box: {
        flex: 1, // Each box takes up equal space
        marginHorizontal: 4, // Add space between boxes
        backgroundColor: '#b30000', // Red background
        borderRadius: 8, // Optional: rounded corners
        padding: 10, // Optional: padding inside the box
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#b30000',
        padding: 8,
        marginRight: 8,
    },
    registerButton: {
        backgroundColor: '#b30000',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    label: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#b30000',
        padding: 8,
        height: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#b30000',
        paddingVertical: 10,
        marginRight: 8,
        alignItems: 'center',
    },
    removeButton: {
        flex: 1,
        backgroundColor: '#b30000',
        paddingVertical: 10,
        alignItems: 'center',
    },
    footerLink: {
        color: '#b30000',
        textAlign: 'center',
        marginTop: 16,
        textDecorationLine: 'underline',
    },
});

export default RegisterForClassScreen;
