// CreateOrEditSurveyScreen.js
import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // For dropdown options
import DateTimePicker from '@react-native-community/datetimepicker'; // For date/time selection
import * as DocumentPicker from 'expo-document-picker'; // For file upload
import TopBar from '../../components/TopBar'; // Your reusable TopBar component

const CreateOrEditSurveyScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleDateChange = (event, selectedDate, setDate) => {
        const currentDate = selectedDate || new Date();
        setDate(currentDate);
    };

    const handleFileUpload = async () => {
        const result = await DocumentPicker.getDocumentAsync({});
        if (result.type === 'success') {
            setUploadedFile(result);
            Alert.alert('File Selected', `You selected: ${result.name}`);
        } else {
            Alert.alert('File Selection Cancelled');
        }
    };

    const handleSubmit = () => {
        if (!title) {
            Alert.alert('Error', 'Tên bài kiểm tra là bắt buộc.');
            return;
        }
        if (endDate <= startDate) {
            Alert.alert('Error', 'Thời gian kết thúc phải sau thời gian bắt đầu.');
            return;
        }
        Alert.alert('Success', 'Bài kiểm tra đã được tạo thành công!');
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar
                leftComponent={
                    <TouchableOpacity onPress={() => alert('Back Pressed')}>
                        <Text style={styles.headerText}>Back</Text>
                    </TouchableOpacity>
                }
                centerComponent={<Text style={styles.headerText}>CREATE
                    SURVEY</Text>}
            />

            <ScrollView contentContainerStyle={styles.formContainer}>
                {/* Title Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Tên bài kiểm tra*"
                    value={title}
                    onChangeText={setTitle}
                />

                {/* Description Input */}
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Mô tả (Tùy chọn)"
                    value={description}
                    multiline
                    onChangeText={setDescription}
                />

                {/* Start Date Picker */}
                <TouchableOpacity
                    onPress={() => setShowStartPicker(true)}
                    style={styles.datePickerButton}
                >
                    <Text style={styles.dateText}>Bắt
                        đầu: {startDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showStartPicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            setShowStartPicker(false);
                            handleDateChange(event, date, setStartDate);
                        }}
                    />
                )}

                {/* End Date Picker */}
                <TouchableOpacity
                    onPress={() => setShowEndPicker(true)}
                    style={styles.datePickerButton}
                >
                    <Text style={styles.dateText}>Kết
                        thúc: {endDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showEndPicker && (
                    <DateTimePicker
                        value={endDate}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            setShowEndPicker(false);
                            handleDateChange(event, date, setEndDate);
                        }}
                    />
                )}

                {/* File Upload Button */}
                <TouchableOpacity style={styles.uploadButton}
                                  onPress={handleFileUpload}>
                    <Text style={styles.uploadButtonText}>
                        {uploadedFile ? uploadedFile.name : 'Upload File'}
                    </Text>
                </TouchableOpacity>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton}
                                  onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Tạo bài kiểm tra</Text>
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
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#b30000',
        borderRadius: 4,
        padding: 12,
        marginBottom: 12,
    },
    dateText: {
        color: '#333',
    },
    uploadButton: {
        backgroundColor: '#b30000',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 4,
        marginBottom: 12,
    },
    uploadButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#b30000',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CreateOrEditSurveyScreen;
