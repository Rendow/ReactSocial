import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, ProfileType} from "../../Redux/propfile-reducer";
import {ReduxStateType} from "../../Redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";

type mapStateToPropsType = {
     profile:ProfileType | null
    auth: boolean

}
type ProfileContainerType = mapStateToPropsType & {
    getProfile:(userId:number) => void
}

type PathParamsType = {
    userId: string,
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

 class ProfileContainer extends React.Component<PropsType, {}>{

    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if(!userId) {
            userId = 12
        }
        this.props.getProfile(userId)
    }

    render(){
        if(!this.props.auth) return <Redirect to={'/login'}/>

        return <Profile {...this.props} profile={this.props.profile}  />
    }
}

let mapStateToProps = (state: ReduxStateType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        auth: state.auth.isAuth
    }
}
let WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps,{getProfile})(WithUrlDataContainerComponent)