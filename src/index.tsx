import React from 'react';
import './index.css';
import store from './Redux/redux-store';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";


const renderTree =  () => {
     const state = store.getState()
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App
                     dispatch={store.dispatch.bind(store)}
                     state={state}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}


renderTree()

store.subscribe(renderTree)





