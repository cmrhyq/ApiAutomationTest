import 'antd/dist/reset.css'
import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter
              future={{
                v7_relativeSplatPath: true,
              }}>
                <App/>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
