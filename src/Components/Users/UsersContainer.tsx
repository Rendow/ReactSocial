import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, UsersType} from "../../Redux/users-reducer";


export type mapStateToPropsType = {
    users: UsersType[]
}
export type dispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
}


let mapStateToProps = (state: ReduxStateType):mapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch: Dispatch):dispatchToPropsType => {
 return {
     follow: (userId:number) => {
         dispatch(followAC(userId))
     },
     unfollow: (userId:number) => {
         dispatch(unfollowAC(userId))
     },
     setUsers: (users: UsersType[]) => {
         dispatch(setUsersAC(users))
     },
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
