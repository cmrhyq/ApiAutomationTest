import axiosInstance from "../../plugins/request/axiosInstance";

// 获取用户信息和权限
export function getUserInfo() {
    return axiosInstance({
        url: '/getInfo',
        method: 'get'
    });
}