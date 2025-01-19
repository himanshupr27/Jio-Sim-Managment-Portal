import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./main.css";
import { Provider } from 'react-redux';
import { store } from "./app/store.js";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
