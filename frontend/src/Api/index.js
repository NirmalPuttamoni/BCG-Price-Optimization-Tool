import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const userDetails = JSON.parse(localStorage.getItem("user_details"));
        const token = userDetails?.token;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;