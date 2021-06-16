import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initialize} from "./redux/app-reducer";
import store, {ReduxStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import { Suspense } from 'react';
import { lazy } from 'react';
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";



const News = lazy(() => import('./components/News/News'));
const Music = lazy(() => import('./components/Music/Music'));
const Settings = lazy(() => import('./components/Settings/Settings'));

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
                <div className='app-content-wrapper'>
                    <div className='nav-wrapper'>
                        <Navbar/>
                    </div>
                    <div className='content-wrapper'>
                        <Suspense fallback={<Preloader/>}>
                            <Switch>
                            <Route path='/' exact render={() => <Redirect to={'profile'}/>}/>
                            <Route path='/ReactSocial' exact render={() => <Login/>}/>
                            <Route path='/profile/:userId?'  render={() => <ProfileContainer/>}/>
                            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <Login/>}/>
                            <Route path='/news' render={() => <News/>}/>
                            <Route path='/music' render={() => <Music/>}/>
                            <Route path='/settings' render={() => <Settings/>}/>
                        </Switch>
                        </Suspense>
                    </div>
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state:ReduxStateType):MapStateToPropsType => ({
    initialized: state.app.initialized,
})
const AppConnect = connect(mapStateToProps,{initialize}) (App);

 const AppContainer = () => {
 return  <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppConnect/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
}
export default AppContainer