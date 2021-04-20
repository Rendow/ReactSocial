import React from 'react';
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unfollow,
    UsersType
} from "../../Redux/users-reducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {userAPI} from "../../api/api";


export type mapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount:number
    currentPage: number
    isFetching:boolean
}
export type dispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (page: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching:(isFetching:boolean) => void
}

type UsersPropsType = mapStateToPropsType & dispatchToPropsType

class UsersContainer extends React.Component <UsersPropsType,{}>{

    componentDidMount() {
        this.props.toggleIsFetching(true)

        userAPI.getUsers(this.props.currentPage,this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            })
    }
    onPageChanged = (pageNumber:number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)

        userAPI.getUsers(pageNumber,this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
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
            unfollow={this.props.unfollow}
        />
        </>
    }
}

let mapStateToProps = (state: ReduxStateType):mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}



export default connect(mapStateToProps, {follow, unfollow, setUsers,
    setCurrentPage, setTotalUsersCount, toggleIsFetching})(UsersContainer)
