import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {authUser} from "../../Redux/auth-reducer";

type HeaderContainerType = MapStateToPropsType &{
    authUser:() => void
}
class HeaderContainer extends React.Component<HeaderContainerType, {}>{
    componentDidMount() {
       this.props.authUser()
    }
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
export default connect(mapStateToProps,{authUser}) (HeaderContainer);