import React from 'react';
import {connect} from "react-redux";
import {ReduxStateType} from "../../redux/redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {Preloader} from "../common/Preloader/Preloader";
import {Users} from "./Users";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
    getUsersPage,
    portionSize
} from "../../redux/users-selectors";
import {actions, FilterType, follow, getPage, getUsers, unFollow, UsersType} from "../../redux/users-reducer";


export type mapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount:number
    currentPage: number
    isFetching:boolean
    followingInProgress:number[]
    portionSize:number
    filter:FilterType
}
export type dispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    getUsers:(pageSize: number, currentPage: number, filter:FilterType)  => void
    getPage:(pageNumber: number, currentPage: number)  => void
}

type UsersPropsType = mapStateToPropsType & dispatchToPropsType

class UsersContainer extends React.Component <UsersPropsType,{}>{

    componentDidMount() {
        const {currentPage,pageSize,filter} =  this.props
        this.props.getUsers(currentPage,pageSize,filter)
    }
    onPageChanged = (pageNumber:number) => {
        const {pageSize,filter} =  this.props
        this.props.getUsers(pageNumber,pageSize,filter)
    }
    onFilterChanged = (filter:FilterType) => {
        const {pageSize} =  this.props
        this.props.getUsers(1,pageSize,filter)
    }

    render(){
        return <>
            {this.props.isFetching ? <Preloader/> : ''}
            <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unFollow={this.props.unFollow}
            followingInProgress={this.props.followingInProgress}
            portionSize={this.props.portionSize}
            onFilterChanged={this.onFilterChanged}
        />
        </>
    }
}

let mapStateToProps = (state: ReduxStateType):mapStateToPropsType => {
    return {
        users: getUsersPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        portionSize: portionSize(state),
        followingInProgress:getFollowingInProgress(state),
        filter:getUsersFilter(state)
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps,
    {follow, unFollow, setUsers:actions.setUsers,
        setCurrentPage:actions.setCurrentPage, setTotalUsersCount:actions.setTotalUsersCount, toggleIsFetching:actions.toggleIsFetching,
        toggleIsFollowingProgress:actions.toggleIsFollowingProgress,getUsers, getPage}), WithAuthRedirect)(UsersContainer)
