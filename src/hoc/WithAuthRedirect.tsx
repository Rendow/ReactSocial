import Dialogs, {DialogType} from "../Components/Dialogs/Dialogs";
import {Redirect} from "react-router-dom";
import React from "react";
import {ReduxStateType} from "../Redux/redux-store";
import {connect} from "react-redux";
import ProfileContainer from "../Components/Profile/ProfileContainer";

type mapStateForRedirectPropsType = {
    auth: boolean
}
let mapStateToPropsForRedirect = (state: ReduxStateType): mapStateForRedirectPropsType => {
    return {
        auth: state.auth.isAuth
    }
}
export const WithAuthRedirect = (Component: any) => {

    class RedirectComponent extends React.Component<any, any> {
        render() {
            if (!this.props.auth) return <Redirect to={'/login'}/>
            return <Component {...this.props}/>
        }
    }

    const ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectAuthRedirectComponent
}