import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://192.168.1.210:3000/', // Link Postman
    headers: {
        'Content-Type': 'application/json', // Định dạng JSON
    },
    timeout: 10000, // Thời gian chờ tối đa 10 giây
});

// Interceptor cho request
axiosClient.interceptors.request.use(
    (config) => {
        // Thêm token nếu cần
        const token = ''; // Ví dụ: Lấy token từ AsyncStorage hoặc localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor cho response
axiosClient.interceptors.response.use(
    (response) => response.data, // Chỉ lấy phần data từ response
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error.response?.data || error);
    }
);

export default axiosClient;
