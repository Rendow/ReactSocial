import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from "./Components/Settings/Settings";
import store, {StateType} from "./Redux/State";


type AppPropsType = {
    state: StateType
    dispatch:(action:any) => void
}


function App(props: AppPropsType) {


    return (

            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/profile' render={() => <Profile
                        dispatch={props.dispatch.bind(store)}
                        profilePage={props.state.profilePage}

                    />}/>
                    <Route path='/dialogs' render={() => <Dialogs
                        dialogsPage ={props.state.dialogsPage}
                        dispatch={props.dispatch.bind(store)}
                    />}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>

    );
}

export default App;


