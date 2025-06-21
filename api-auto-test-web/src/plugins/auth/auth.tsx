import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../cache/tokenCache.ts';

interface AuthRouteProps {
    children: React.ReactNode;
    meta: {
        requiresAuth: boolean;
        permissions?: string[];
        roles?: string[];
    };
}

const Auth: React.FC<AuthRouteProps> = ({ children, meta }) => {
    const location = useLocation();
    const token = getToken();

    // 不需要认证的路由直接放行
    if (!meta.requiresAuth) {
        return <>{children}</>;
    }

    // 需要认证但没有token，重定向到登录页
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default Auth;