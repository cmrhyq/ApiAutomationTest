import axiosInstance from "../../plugins/request/axiosInstance.ts";

// 查询菜单列表
export function listMenu(query: any) {
    return axiosInstance({
        url: '/system/menu/list',
        method: 'get',
        params: query
    })
}

// 获取路由
export function getRouters() {
    return axiosInstance({
        url: '/getRouters',
        method: 'get'
    })
}