import * as React from "react";

const Layout = React.lazy(() => import("../components/layout"))
const Login = React.lazy(() => import("../page/login"));
const Index = React.lazy(() => import("../page/index"));
const User = React.lazy(() => import("../page/system/user"));
const NotAuthorized = React.lazy(() => import("../page/error/notAuthorized"))
const NotFound = React.lazy(() => import("../page/error/notFound"))
const ServerError = React.lazy(() => import("../page/error/serverError"));

export interface RouteMeta {
    requiresAuth: boolean;      // 是否需要认证
    permissions?: string[];     // 权限标识数组
    roles?: string[];          // 角色数组
    title?: string;            // 路由标题，用于面包屑导航
}

export interface RouteConfig {
    path: string;
    component: React.ReactNode;
    meta: RouteMeta;
    children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
    {
        path: "/login",
        component: <Login />,
        meta: {
            requiresAuth: false
        }
    }, {
        path: "/",
        component: <Layout/>,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: "index",
                component: <Index />,
                meta: {
                    requiresAuth: false
                }
            }, {
                path: "user",
                component: <User/>,
                meta: {
                    requiresAuth: true,
                    permissions: ["system:user:list"],
                }
            },{
                path: "403",
                component: <NotAuthorized />,
                meta: {
                    requiresAuth: false
                }
            }, {
                path: "404",
                component: <NotFound />,
                meta: {
                    requiresAuth: false
                }
            }, {
                path: "500",
                component: <ServerError />,
                meta: {
                    requiresAuth: false
                }
            }
        ]
    }, {
        path: "/403",
        component: <NotAuthorized />,
        meta: {
            requiresAuth: false
        }
    }, {
        path: "/404",
        component: <NotFound />,
        meta: {
            requiresAuth: false
        }
    }, {
        path: "/500",
        component: <ServerError />,
        meta: {
            requiresAuth: false
        }
    }
]