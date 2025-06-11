import 'antd/dist/reset.css'
import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>,
)

// Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
//     console.log(message)
// })
