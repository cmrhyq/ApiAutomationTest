import './App.css'
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from './router';
import AuthRoute from './components/AuthRoute';
import { fetchUserInfo } from './store/slices/userSlice';
import { getToken } from './plugins/auth';
import type { AppDispatch, RootState } from './store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
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
              <AuthRoute meta={route.meta}>
                {route.component}
              </AuthRoute>
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
            <AuthRoute meta={route.meta}>
              {route.component}
            </AuthRoute>
          }
        />
      );
    });
  };

  return (
    <Routes>
      {renderRoutes(routes)}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
