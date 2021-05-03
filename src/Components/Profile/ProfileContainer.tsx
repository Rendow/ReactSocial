import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, ProfileType} from "../../Redux/propfile-reducer";
import {ReduxStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

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

let mapStateToProps = (state: ReduxStateType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profile
    }
}

export default  compose<React.ComponentType>(connect(mapStateToProps,{getProfile}),withRouter, WithAuthRedirect)(ProfileContainer)
