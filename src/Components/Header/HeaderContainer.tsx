import React from "react";
import Header from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {setAuthUserData} from "../../Redux/auth-reducer";

type HeaderContainerType = MapStateToPropsType &{
    setAuthUserData:(userId:number, email:string, login:string) => void
}
class HeaderContainer extends React.Component<HeaderContainerType, {}>{
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials:true
        })
            .then(response => {
                if(response.data.resultCode === 0){
                    let {id, login, email} = response.data.data
                    this.props.setAuthUserData(id,email,login)
                }

            })
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
export default connect(mapStateToProps,{setAuthUserData}) (HeaderContainer);