import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {Dispatch} from "redux";
import {
    followAC,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC,
    unfollowAC,
    UsersType
} from "../../Redux/users-reducer";


export type mapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount:number
    currentPage: number
}
export type dispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (page: number) => void
    setTotalUsersCount: (totalCount: number) => void
}


let mapStateToProps = (state: ReduxStateType):mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
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
     setCurrentPage: (page: number) => {
         dispatch(setCurrentPageAC(page))
     },
     setTotalUsersCount: (totalCount: number) => {
         dispatch(setUsersTotalCountAC(totalCount))
     },

 }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer