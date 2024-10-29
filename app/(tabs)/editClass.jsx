// EditClassScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import TopBar from '../../components/TopBar'; // Reuse the TopBar component
import { Picker } from '@react-native-picker/picker'; // Dropdown picker
import { Ionicons } from '@expo/vector-icons'; // Icons for the back button

const EditClassScreen = () => {
    const [classCode, setClassCode] = useState('745208');
    const [className, setClassName] = useState('Taekwondo 1');
    const [courseCode, setCourseCode] = useState('PE2251');
    const [classType, setClassType] = useState('LT+BT');
    const [startWeek, setStartWeek] = useState('Tuần 1');
    const [endWeek, setEndWeek] = useState('Tuần 14');
    const [credits, setCredits] = useState('50');

    const handleRemoveClass = () => alert('Class removed!');
    const handleConfirm = () => alert('Class confirmed!');

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar
                leftComponent={
                    <TouchableOpacity onPress={() => alert('Back Pressed')}>
                        <Ionicons name="arrow-back-outline" size={24} color="white" />
                    </TouchableOpacity>
                }
                centerComponent={<Text style={styles.headerText}>EDIT CLASS</Text>}
            />

            <ScrollView contentContainerStyle={styles.formContainer}>
                {/* Class Code Input */}
                <TextInput
                    style={styles.input}
                    value={classCode}
                    onChangeText={setClassCode}
                />

                {/* Class Name Input */}
                <TextInput
                    style={styles.input}
                    value={className}
                    onChangeText={setClassName}
                />

                {/* Course Code Input */}
                <TextInput
                    style={styles.input}
                    value={courseCode}
                    onChangeText={setCourseCode}
                />

                {/* Class Type Dropdown */}
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={classType}
                        onValueChange={(itemValue) => setClassType(itemValue)}
                    >
                        <Picker.Item label="LT+BT" value="LT+BT" />
                        <Picker.Item label="LT" value="LT" />
                        <Picker.Item label="BT" value="BT" />
                    </Picker>
                </View>

                {/* Start and End Week Dropdowns */}
                <View style={styles.row}>
                    <View style={styles.dropdown}>
                        <Picker
                            selectedValue={startWeek}
                            onValueChange={(itemValue) => setStartWeek(itemValue)}
                        >
                            <Picker.Item label="Tuần 1" value="Tuần 1" />
                            <Picker.Item label="Tuần 2" value="Tuần 2" />
                            <Picker.Item label="Tuần 3" value="Tuần 3" />
                        </Picker>
                    </View>
                    <View style={styles.dropdown}>
                        <Picker
                            selectedValue={endWeek}
                            onValueChange={(itemValue) => setEndWeek(itemValue)}
                        >
                            <Picker.Item label="Tuần 14" value="Tuần 14" />
                            <Picker.Item label="Tuần 13" value="Tuần 13" />
                            <Picker.Item label="Tuần 12" value="Tuần 12" />
                        </Picker>
                    </View>
                </View>

                {/* Credits Input */}
                <TextInput
                    style={styles.input}
                    value={credits}
                    onChangeText={setCredits}
                    keyboardType="numeric"
                />

                {/* Buttons Row */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.removeButton} onPress={handleRemoveClass}>
                        <Text style={styles.buttonText}>Xóa lớp học</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                        <Text style={styles.buttonText}>Xác nhận</Text>
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
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    formContainer: {
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#b30000',
        padding: 10,
        marginBottom: 12,
        borderRadius: 4,
    },
    dropdown: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#b30000',
        borderRadius: 4,
        marginRight: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    removeButton: {
        flex: 1,
        backgroundColor: '#b30000',
        paddingVertical: 12,
        marginRight: 8,
        alignItems: 'center',
        borderRadius: 4,
    },
    confirmButton: {
        flex: 1,
        backgroundColor: '#b30000',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    footerLink: {
        color: '#b30000',
        textAlign: 'center',
        marginTop: 16,
        textDecorationLine: 'underline',
    },
});

export default EditClassScreen;
