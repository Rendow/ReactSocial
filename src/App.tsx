import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {Redirect, Route} from "react-router-dom";
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from "./Components/Settings/Settings";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {Login} from "./Components/Login/Login";


function App() {
    return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>

                {/*   <Route path='/' render={() => <Redirect to={'profile'}/>}/>*/}
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>

    );
}

export default App;


