import React, {useEffect, useState} from "react";
import {View, StyleSheet, ActivityIndicator, Alert} from "react-native";
import CustomTable from "../../components/CustomTable";
import axiosClient from "../../axiosClient";

const getClassList = async (token, userId, role) => {
    try {
        const response = await axiosClient.post("/class/list", {
            token,
            user_id: userId,
            role,
        });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Error fetching class list:", error);
        throw error;
    }
};

const OpenClassesScreen = () => {
    const [classDetails, setClassDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    // Thông tin người dùng (thay thế bằng dữ liệu thực tế)
    const token = "your_token_here"; // Token đăng nhập
    const userId = "user_id_here"; // ID người dùng
    const role = "student"; // Vai trò người dùng (lecturer/student)

    const headers = [
        { label: "ID Lớp", field: "class_id" },
        { label: "Tên Lớp", field: "class_name" },
        { label: "Giảng Viên", field: "lecturer_name" },
        { label: "Số Sinh Viên", field: "student_count" },
        { label: "Ngày Bắt Đầu", field: "start_date" },
        { label: "Ngày Kết Thúc", field: "end_date" },
        { label: "Trạng Thái", field: "status" },
    ];

    // Gọi API lấy danh sách lớp học
    useEffect(() => {
        const fetchClassList = async () => {
            try {
                setLoading(true);
                const data = await getClassList(token, userId, role);
                setClassDetails(data.classes); // Giả sử API trả về { classes: [...] }
            } catch (error) {
                Alert.alert("Error", "Không thể tải danh sách lớp học");
            } finally {
                setLoading(false);
            }
        };

        fetchClassList();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#b30000" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CustomTable
                data={classDetails}
                headers={headers}
                hasSelected={false} // Không cần checkbox
                customStyles={{
                    tableHeader: styles.tableHeader,
                    headerBox: styles.headerBox,
                    tableRow: styles.tableRow,
                    cellBox: styles.cellBox,
                    headerText: styles.headerText,
                    cellText: styles.cell,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        padding: 16,
        marginTop: 50
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#b30000",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    headerBox: {
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 10,
        alignItems: "center",
    },
    cellBox: {
        width: 120,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        color: "white",
        fontWeight: "bold",
    },
    cell: {
        textAlign: "center",
        color: "#333",
    },
});

export default OpenClassesScreen;
