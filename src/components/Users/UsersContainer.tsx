import React from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
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

const UsersContainer = () => {

    const {usersOnPage, users,totalUsersCount,filter,portionSize,currentPage,isFetching} = useSelector((state:ReduxStateType) => state.usersPage)
    const dispatch = useDispatch()

    const onPageChanged = (pageNumber:number) => {
        dispatch(getUsers(pageNumber,usersOnPage,filter))
    }
    const onFilterChanged = (filter:FilterType) => {
        dispatch(getUsers(1,usersOnPage,filter))
    }


    return  <>
        {isFetching ? <Preloader/> : ''}
        <Users
            totalUsersCount={totalUsersCount}
            usersOnPage={usersOnPage}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            users={users}
            portionSize={portionSize}
            onFilterChanged={onFilterChanged}
            filter={filter}
        />
        </>
}

// class UsersContainer extends React.Component <UsersPropsType,{}>{
//
//     componentDidMount() {
//         const {currentPage,pageSize,filter} =  this.props
//         this.props.getUsers(currentPage,pageSize,filter)
//     }
//     onPageChanged = (pageNumber:number) => {
//         const {pageSize,filter} =  this.props
//         this.props.getUsers(pageNumber,pageSize,filter)
//     }
//     onFilterChanged = (filter:FilterType) => {
//         const {pageSize} =  this.props
//         this.props.getUsers(1,pageSize,filter)
//     }
//
//     render(){
//         return <>
//             {this.props.isFetching ? <Preloader/> : ''}
//             <Users
//             totalUsersCount={this.props.totalUsersCount}
//             usersOnPage={this.props.pageSize}
//             currentPage={this.props.currentPage}
//             onPageChanged={this.onPageChanged}
//             users={this.props.users}
//             follow={this.props.follow}
//             unFollow={this.props.unFollow}
//             followingInProgress={this.props.followingInProgress}
//             portionSize={this.props.portionSize}
//             onFilterChanged={this.onFilterChanged}
//         />
//         </>
//     }
// }
//
// let mapStateToProps = (state: ReduxStateType):mapStateToPropsType => {
//     return {
//         users: getUsersPage(state),
//         pageSize: getPageSize(state),
//         totalUsersCount: getTotalUsersCount(state),
//         currentPage: getCurrentPage(state),
//         isFetching: getIsFetching(state),
//         portionSize: portionSize(state),
//         followingInProgress:getFollowingInProgress(state),
//         filter:getUsersFilter(state)
//     }
// }
//
// export default compose<React.ComponentType>(connect(mapStateToProps,
//     {follow, unFollow, setUsers:actions.setUsers,
//         setCurrentPage:actions.setCurrentPage, setTotalUsersCount:actions.setTotalUsersCount, toggleIsFetching:actions.toggleIsFetching,
//         toggleIsFollowingProgress:actions.toggleIsFollowingProgress,getUsers, getPage}), WithAuthRedirect)(UsersContainer)
//

export default compose<React.ComponentType>(WithAuthRedirect)(UsersContainer)