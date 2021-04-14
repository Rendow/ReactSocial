import React from 'react';
import './index.css';
import store from './Redux/redux-store';
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import App from "./App";
import {Provider} from 'react-redux';


ReactDOM.render(
        <React.StrictMode>
            <HashRouter>
                <Provider store={store}>
                <App/>
                </Provider>
            </HashRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );

