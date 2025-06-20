import axiosInstance from "../plugins/request/axiosInstance.ts";

export default function login(username: string, password: string, code:string, uuid: string) {
    const data = {
        username,
        password,
        code,
        uuid
    }
    return axiosInstance({
        url: '/login',
        headers: {
            isToken: false,
            repeatSubmit: false // 不需要防止数据重复提交
        },
        method: 'post',
        data: data
    })
}

// 获取验证码
export function getCodeImg() {
    return axiosInstance({
        url: '/captchaImage',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })
}