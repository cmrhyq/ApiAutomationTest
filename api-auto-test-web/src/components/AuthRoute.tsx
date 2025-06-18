import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../plugins/auth';
import { useSelector } from 'react-redux';

interface AuthRouteProps {
    children: React.ReactNode;
    meta: {
        requiresAuth: boolean;
        permissions?: string[];
        roles?: string[];
    };
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children, meta }) => {
    const location = useLocation();
    const token = getToken();
    const userState = useSelector((state: any) => state.user);
    const { permissions = [], roles = [] } = userState || {};

    // 不需要认证的路由直接放行
    if (!meta.requiresAuth) {
        return <>{children}</>;
    }

    // 需要认证但没有token，重定向到登录页
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 检查权限
    if (meta.permissions && meta.permissions.length > 0) {
        const hasPermission = meta.permissions.some(permission =>
            permissions.includes(permission)
        );
        if (!hasPermission) {
            return <Navigate to="/403" replace />;
        }
    }

    // 检查角色
    if (meta.roles && meta.roles.length > 0) {
        const hasRole = meta.roles.some(role => roles.includes(role));
        if (!hasRole) {
            return <Navigate to="/403" replace />;
        }
    }

    return <>{children}</>;
};

export default AuthRoute;