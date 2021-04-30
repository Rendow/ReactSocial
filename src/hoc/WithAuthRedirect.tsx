import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {ReduxStateType} from "../Redux/redux-store";
import {connect} from "react-redux";

type mapStateForRedirectPropsType = {
    auth: boolean
}
let mapStateToPropsForRedirect = (state: ReduxStateType): mapStateForRedirectPropsType => {
    return {
        auth: state.auth.isAuth
    }
}
export function WithAuthRedirect <T>(Component: ComponentType<T>)  {

    const RedirectComponent = (props:mapStateForRedirectPropsType) => {
            let {auth, ...restPtops} = props
            if (!props.auth) return <Redirect to={'/login'}/>
            return <Component {...restPtops as T}/>

    }

    const ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectAuthRedirectComponent
}