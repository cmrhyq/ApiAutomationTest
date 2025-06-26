import './App.css'
import {useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {routes} from './router';
import {fetchUserInfo} from './store/reducers/user/userSlice';
import {getToken} from './plugins/cache/tokenCache.ts';
import type {AppDispatch, RootState} from './store';
import Auth from "./plugins/auth/auth.tsx";
import {setTab} from './store/reducers/tabs/tabsSlice';

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const {user} = useSelector((state: RootState) => state.user);
    const {tabs} = useSelector((state: RootState) => state.tabs);
    const token = getToken();

    useEffect(() => {
        if (token && !user) {
            dispatch(fetchUserInfo());
        }
    }, [dispatch, token, user]);

    // 初始化标签页，确保首页标签页存在
    useEffect(() => {
        // 如果没有首页标签，添加首页标签
        if (token && user && !tabs.some(tab => tab.key === '/index')) {
            dispatch(setTab({
                icon: "DashboardOutlined",
                label: "首页",
                key: "/index",
                closable: false
            }));
        }
    }, [dispatch, token, user, tabs]);

    const renderRoutes = (routes: any) => {
        return routes.map((route: any) => {
            if (route.children && route.children.length > 0) {
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <Auth meta={route.meta}>
                                {route.component}
                            </Auth>
                        }
                    >
                        {renderRoutes(route.children)}
                    </Route>
                );
            }
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <Auth meta={route.meta}>
                            {route.component}
                        </Auth>
                    }
                />
            );
        });
    };

    return (
        <Routes>
            {renderRoutes(routes)}
            <Route path="*" element={<Navigate to="/404" replace/>}/>
        </Routes>
    );
}

export default App;
