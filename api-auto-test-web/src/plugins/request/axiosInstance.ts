import axios from "axios";
import qs from "qs";
import { message } from 'antd';

const axiosInstance = axios.create({
    // baseURL: "http://127.0.0.1:8000/spider",
    baseURL: process.env.VITE_APP_BASE_URL,
    // timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    transformRequest: [
        (data) => {
            return JSON.stringify(data);
        },
    ],
    paramsSerializer: params => {
        return qs.stringify(params, { indices: false });
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        // Add any request interceptors here
        return config;
    },
    (error) => {
        // Handle request error
        message.error(error.message, 3)
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        // Handle response data
        if (response.data.code !== 200) {
            // Handle error response
            message.warning(response.data.message);
            return Promise.reject(new Error(response.data.message || 'Error'));
        } else {
            return response;
        }
    },
    (error) => {
        // Handle response error
        message.error(error.message)
        return Promise.reject(error);
    }
)

export default axiosInstance;