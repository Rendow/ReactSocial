import React from 'react';
import './index.css';
import state, {addPost, StateType, subscribe, updateNewPostText} from './Redux/State';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";


 let renderTree = (state: StateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App updateNewPostText={updateNewPostText}
                     addPost={addPost}
                     state={state}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

renderTree(state)

subscribe(renderTree)





