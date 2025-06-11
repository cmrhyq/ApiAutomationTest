import * as React from "react";
import {Navigate} from "react-router-dom";

const Login = React.lazy(() => import("../page/login"));
const Index = React.lazy(() => import("../page/index"));


const routes = [
    {
        path: "/",
        element: <Navigate to="/login"/>
    }, {
        path: "/login",
        element: <Login />
    }, {
        path: "/index",
        element: <Index />
    }
]

export default routes;