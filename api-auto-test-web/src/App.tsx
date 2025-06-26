import './App.css'
import {useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {routes} from './router';
import {fetchUserInfo} from './store/reducers/user/userSlice';
import {getToken} from './plugins/cache/tokenCache.ts';
import type {AppDispatch, RootState} from './store';
import Auth from "./plugins/auth/auth.tsx";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const {user} = useSelector((state: RootState) => state.user);
    const token = getToken();

    useEffect(() => {
        if (token && !user) {
            dispatch(fetchUserInfo());
        }
    }, [dispatch, token, user]);

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
