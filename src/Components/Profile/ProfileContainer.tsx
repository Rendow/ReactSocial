import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, ProfileType, updateStatus} from "../../Redux/propfile-reducer";
import {ReduxStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

type mapStateToPropsType = {
     profile:ProfileType | null
    status: string
}

type ProfileContainerType = mapStateToPropsType & {
    getProfile:(userId:number) => void
    getStatus:(userId:number) => void
    updateStatus:(text:string) => void
}

type PathParamsType = {
    userId: string,
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

 class ProfileContainer extends React.Component<PropsType, {}>{

    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if(!userId) {
            userId = 16107
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }

    render(){
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}

        />
    }
}

let mapStateToProps = (state: ReduxStateType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

export default  compose<React.ComponentType>(connect(mapStateToProps,{getStatus,updateStatus,getProfile}),withRouter)(ProfileContainer)
