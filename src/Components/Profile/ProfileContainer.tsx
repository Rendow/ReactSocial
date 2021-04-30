import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, ProfileType} from "../../Redux/propfile-reducer";
import {ReduxStateType} from "../../Redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import Dialogs from "../Dialogs/Dialogs";

type mapStateToPropsType = {
     profile:ProfileType | null
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
            userId = 4
        }
        this.props.getProfile(userId)
    }

    render(){
        return <Profile {...this.props} profile={this.props.profile}  />
    }
}
const AuthRedirectComponent = WithAuthRedirect(ProfileContainer)


let mapStateToProps = (state: ReduxStateType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profile
    }
}

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
export default connect(mapStateToProps,{getProfile})(WithUrlDataContainerComponent)