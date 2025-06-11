import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
} from 'react';

// 定义 AuthContext 的值类型
interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

// 创建 AuthContext，默认值为 null
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider 的 props 类型
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // 使用 localStorage 存储认证状态，实现刷新页面后仍保持登录状态
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        // 初始化时从 localStorage 读取状态
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    // 模拟登录函数
    const login = (token: string) => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true'); // 标记已登录
        localStorage.setItem('authToken', token); // 存储 token (在真实应用中，这里会存储JWT等)
        console.log('用户已登录，Token:', token);
    };

    // 模拟登出函数
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); // 移除登录标记
        localStorage.removeItem('authToken'); // 移除 token
        console.log('用户已登出');
    };

    // 可以在这里添加 useEffect 来监听 isAuthenticated 状态变化，做一些副作用操作
    useEffect(() => {
        // 例如：当 isAuthenticated 变为 true 时，可以执行一些初始化数据加载
        // 当 isAuthenticated 变为 false 时，可以清除一些用户相关数据
        console.log('认证状态变化:', isAuthenticated);
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 自定义 Hook，方便在组件中使用认证上下文
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        // 如果在 AuthProvider 外部使用 useAuth，会抛出错误
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};