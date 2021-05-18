import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {Route} from "react-router-dom";
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from "./Components/Settings/Settings";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect} from "react-redux";
import {authUser} from "./redux/auth-reducer";
import {initialize} from "./redux/app-reducer";
import {ReduxStateType} from "./redux/redux-store";
import {Preloader} from "./Components/common/Preloader/Preloader";

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

                    {/*
                    <Route path='/' render={() => <Redirect to={'profile'}/>}/>
*/}

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


