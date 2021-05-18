import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {ReduxStateType} from "../../redux/redux-store";
import {authUser, logout} from "../../redux/auth-reducer";

type HeaderContainerType = MapStateToPropsType &{
    authUser:() => void
    logout:() => void
}
class HeaderContainer extends React.Component<HeaderContainerType, {}>{

    render() {
      return <Header {...this.props}/>
    }
}
type  MapStateToPropsType = {
    login: string | null
    isAuth: boolean
}
const mapStateToProps = (state:ReduxStateType):MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})
export default connect(mapStateToProps,{authUser, logout}) (HeaderContainer);