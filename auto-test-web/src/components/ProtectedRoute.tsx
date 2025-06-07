// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth(); // 获取认证状态

    if (!isAuthenticated) {
        // 如果用户未认证，则重定向到登录页面
        // `replace` 属性会替换当前历史记录中的条目，防止用户通过浏览器返回按钮回到未授权页面
        return <Navigate to="/login" replace />;
    }

    // 如果用户已认证，则渲染子路由（通过 <Outlet />）
    // <Outlet /> 是 React Router v6 的特性，用于渲染嵌套路由中的子元素
    return <Outlet />;
};

export default ProtectedRoute;