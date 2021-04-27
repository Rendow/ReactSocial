import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserById, setUsersProfile} from "../../Redux/propfile-reducer";
import {ReduxStateType} from "../../Redux/redux-store";
import { RouteComponentProps, withRouter } from "react-router-dom";

type mapStateToPropsType = {
     profile:ProfileType | null
}
type ProfileContainerType = mapStateToPropsType & {
    setUserById:(userId:number) => void
}

type PathParamsType = {
    userId: string,
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

 class ProfileContainer extends React.Component<PropsType, {}>{

    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if(!userId) {
            userId = 1
        }
        this.props.setUserById(userId)
    }

    render(){
        return <Profile {...this.props} profile={this.props.profile}  />
    }
}
let mapStateToProps = (state: ReduxStateType):mapStateToPropsType => {
    return {
     profile:state.profilePage.profile
    }
}
let WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps,{setUsersProfile,setUserById})(WithUrlDataContainerComponent)