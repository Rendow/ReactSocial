import React from 'react';
import './index.css';
import store from './Redux/redux-store';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {Provider} from 'react-redux';


const renderTree =  () => {

    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                <App/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}


renderTree()

store.subscribe(renderTree)





