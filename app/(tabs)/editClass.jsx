import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";
import TopBar from "../../components/TopBar";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import axiosClient from "../../axiosClient";

const editClass = async (token, classId, updates) => {
    try {
        const response = await axiosClient.put(`/class/edit/`, classId, {
            token,
            class_id: classId,
            ...updates, // Truyền các thông tin cần chỉnh sửa
        });
        return response.data;
    } catch (error) {
        console.error("Error editing class:", error.response?.data || error.message);
        throw error;
    }
};

const deleteClass = async (token, classId) => {
    try {
        const response = await axiosClient.post("/class/delete/", classId, {

        });
        return response.data;
    } catch (error) {
        console.error("Error deleting class:", error.response?.data || error.message);
        throw error;
    }
};

const EditClassScreen = () => {
    const [classId, setClassId] = useState("12345"); // ID lớp cần chỉnh sửa
    const [className, setClassName] = useState("Taekwondo 1");
    const [startDate, setStartDate] = useState("2025-01-15");
    const [endDate, setEndDate] = useState("2025-06-15");
    const [status, setStatus] = useState("Active");

    // Token giả lập (thay thế bằng token thực tế)
    const token = "your_token_here";

    const handleEditClass = async () => {
        try {
            const updates = {
                class_name: className,
                start_date: startDate,
                end_date: endDate,
                status: status,
            };
            const response = await editClass(token, classId, updates);
            Alert.alert("Thành công", "Thông tin lớp học đã được cập nhật.");
        } catch (error) {
            Alert.alert("Lỗi", "Không thể cập nhật lớp học.");
        }
    };

    const handleDeleteClass = async () => {
        try {
            const response = await deleteClass(token, classId);
            Alert.alert("Thành công", "Lớp học đã được xóa.");
        } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa lớp học.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar
                leftComponent={
                    <TouchableOpacity onPress={() => alert("Back Pressed")}>
                        <Ionicons name="arrow-back-outline" size={24} color="white" />
                    </TouchableOpacity>
                }
                centerComponent={<Text style={styles.headerText}>EDIT CLASS</Text>}
            />

            <ScrollView contentContainerStyle={styles.formContainer}>
                {/* Class Name Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Tên lớp học"
                    value={className}
                    onChangeText={setClassName}
                />

                {/* Start Date Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Ngày bắt đầu (YYYY-MM-DD)"
                    value={startDate}
                    onChangeText={setStartDate}
                />

                {/* End Date Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Ngày kết thúc (YYYY-MM-DD)"
                    value={endDate}
                    onChangeText={setEndDate}
                />

                {/* Status Dropdown */}
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={status}
                        onValueChange={(itemValue) => setStatus(itemValue)}
                    >
                        <Picker.Item label="Active" value="Active" />
                        <Picker.Item label="Upcoming" value="Upcoming" />
                        <Picker.Item label="Completed" value="Completed" />
                    </Picker>
                </View>

                {/* Buttons */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.removeButton} onPress={handleDeleteClass}>
                        <Text style={styles.buttonText}>Xóa lớp học</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmButton} onPress={handleEditClass}>
                        <Text style={styles.buttonText}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    formContainer: {
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#b30000",
        padding: 10,
        marginBottom: 12,
        borderRadius: 4,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#b30000",
        borderRadius: 4,
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    removeButton: {
        flex: 1,
        backgroundColor: "#b30000",
        paddingVertical: 12,
        marginRight: 8,
        alignItems: "center",
        borderRadius: 4,
    },
    confirmButton: {
        flex: 1,
        backgroundColor: "#b30000",
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 4,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default EditClassScreen;
