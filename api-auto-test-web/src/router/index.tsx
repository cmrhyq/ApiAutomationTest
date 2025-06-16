import * as React from "react";
import {Navigate} from "react-router-dom";

const Login = React.lazy(() => import("../page/login"));
const Index = React.lazy(() => import("../page/index"));
const NotAuthorized = React.lazy(() => import("../page/error/notAuthorized"))
const NotFound = React.lazy(() => import("../page/error/notFound"))
const ServerError = React.lazy(() => import("../page/error/serverError"));

export const publicRoutes = [
    {
        path: "/",
        element: <Navigate to="/login"/>
    }, {
        path: "/*",
        element: <Navigate to="/login"/>
    }, {
        path: "/login",
        element: <Login />
    }
]

export const dynamicRoutes = [
    {
        path: "/index",
        element: <Index />
    }, {
        path: "/*",
        element: <Navigate to="/404"/>
    }, {
        path: "/403",
        element: <NotAuthorized />
    }, {
        path: "/404",
        element: <NotFound/>
    }, {
        path: "/500",
        element: <ServerError />
    }
]

