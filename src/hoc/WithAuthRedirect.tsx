import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {ReduxStateType} from "../redux/redux-store";
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
            let {auth, ...restProps} = props
            if (!props.auth) return <Redirect to={'/Login'}/>

            return <Component {...restProps as T}/>

    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}