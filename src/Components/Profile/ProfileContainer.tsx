import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, ProfileType, updateStatus} from "../../Redux/propfile-reducer";
import {ReduxStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";

type mapStateToPropsType = {
    profile: ProfileType | null
    status: string
    isAuth: boolean
    authorizedUserId: number | null
}

type ProfileContainerType = mapStateToPropsType & {
    getProfile:(userId:number) => void
    getStatus:(userId:number) => void
    updateStatus:(text:string) => void
}

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

 class ProfileContainer extends React.Component<PropsType, {}>{

    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if(!userId) {
            userId = Number(this.props.authorizedUserId)
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }

    render(){
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}/>
    }
}

let mapStateToProps = (state: ReduxStateType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
}

export default  compose<React.ComponentType>(connect(mapStateToProps,{getStatus,updateStatus,getProfile}),withRouter)(ProfileContainer)
