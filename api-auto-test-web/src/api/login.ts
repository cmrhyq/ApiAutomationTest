import axiosInstance from "../plugins/request/axiosInstance.ts";

/**
 * 登陆
 * @param username 账号
 * @param password 密码
 * @param code 验证码
 * @param uuid uuid
 */
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

/**
 * 退出方法
 */
export function logout() {
    return axiosInstance({
        url: '/logout',
        method: 'post'
    })
}

/**
 * 获取验证码
 */
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