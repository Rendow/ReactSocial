import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Redirect, Route} from "react-router-dom";
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initialize} from "./redux/app-reducer";
import {ReduxStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";

type HeaderContainerType  =  MapStateToPropsType & {
    initialize:() => void
}
type  MapStateToPropsType = {
    initialized:boolean
}
class App extends React.Component<HeaderContainerType, {}> {
    componentDidMount() {
        this.props.initialize()

    }
    render() {
        if(!this.props.initialized) {
            return  <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/' exact render={() => <Redirect to={'profile'}/>}/>

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
}
const mapStateToProps = (state:ReduxStateType):MapStateToPropsType => ({
    initialized: state.app.initialized,
})
export default connect(mapStateToProps,{initialize}) (App);


