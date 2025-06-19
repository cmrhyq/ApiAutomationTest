import axios from "axios";
import qs from "qs";
import { message } from 'antd';
import {getToken} from "../auth.ts";
import cache from "../cache.ts";
import errorCode from "../../types/errorCode.ts";

interface requestObj {
    url: string | undefined; // 请求地址
    data: string; // 请求数据
    time: number; // 请求时间
}

// 是否显示重新登录
export let isReLogin = { show: false }

const axiosInstance = axios.create({
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
    },
    // 超时
    timeout: 10000
})


axiosInstance.interceptors.request.use((config) => {
        // Add any request interceptors here
        // 是否需要设置 token
        const isToken = (config.headers || {}).isToken === false
        // 是否需要防止数据重复提交
        const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
        // 是否需要防止数据重复提交
        if (getToken() && !isToken) {
            config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
            const requestObj:requestObj = {
                url: config.url,
                data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
                time: new Date().getTime()
            }
            const requestSize = Object.keys(JSON.stringify(requestObj)).length // 请求数据大小
            const limitSize = 5 * 1024 * 1024 // 限制存放数据5M
            if (requestSize >= limitSize) {
                console.warn(`[${config.url}]: ` + '请求数据大小超出允许的5M限制，无法进行防重复提交验证。')
                return config
            }
            const sessionObj = cache.session.getJSON('sessionObj')
            if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
                cache.session.setJSON('sessionObj', requestObj)
            } else {
                const s_url = sessionObj.url                  // 请求地址
                const s_data = sessionObj.data                // 请求数据
                const s_time = sessionObj.time                // 请求时间
                const interval = 1000                         // 间隔时间(ms)，小于此时间视为重复提交
                if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
                    const message = '数据正在处理，请勿重复提交'
                    console.warn(`[${s_url}]: ` + message)
                    return Promise.reject(new Error(message))
                } else {
                    cache.session.setJSON('sessionObj', requestObj)
                }
            }
        }
        return config;
    }, (error) => {
        // Handle request error
        message.error(error.message, 3)
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use((response) => {
        const code = response.data.code || 200;
        const msg:string = errorCode[code] || response.data.msg || errorCode['default'];
        // 二进制数据则直接返回
        if (response.request.responseType ===  'blob' || response.request.responseType ===  'arraybuffer') {
            return response
        }
        if (code === 401){
            if(!isReLogin.show) {
                isReLogin.show = true;
                message.error(msg, 3).then(() => {
                    isReLogin.show = false;
                });
            }
            return Promise.reject("无效会话或者登录已过期。");
        } else if (code === 500) {
            message.error(msg, 3)
            return Promise.reject(new Error(msg))
        } else if (code === 601) {
            message.warning(msg, 3)
            return Promise.reject('error')
        } else if (code !== 200) {
            message.error(msg, 3)
            return Promise.reject('error')
        } else {
            return response
        }
    }, (error) => {
        let { message } = error
        if (message == "Network Error") {
            message = "后端接口连接异常"
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时"
        } else if (message.includes("Request failed with status code")) {
            message = "系统异常"
        }
        message.open({
            type: 'error',
            content: message,
            duration: 3
        })
        return Promise.reject(error)
    }
)

export default axiosInstance;