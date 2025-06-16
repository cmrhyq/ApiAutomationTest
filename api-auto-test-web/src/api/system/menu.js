// 查询菜单列表
import axiosInstance from "../../plugins/request/axiosInstance.ts";

export function listMenu(query) {
    return axiosInstance({
        url: '/system/menu/list',
        method: 'get',
        params: query
    })
}