import './App.css'
import LayoutFrame from "./layout";
import {publicRoutes} from "./router";
import {getToken} from "./plugins/auth.ts";
import {useRoutes} from "react-router-dom";
import {Spin} from "antd";
import {Suspense} from "react";


function App() {
    const token = getToken();
    const element = useRoutes(publicRoutes)

    if (!token) {
        return (
            <Suspense fallback={
                <Spin tip="Loading" size="large" fullscreen>
                    Loading...
                </Spin>
            }>
                {element}
            </Suspense>
        )
    } else {
        return (
            <LayoutFrame/>
        )
    }
}

export default App
