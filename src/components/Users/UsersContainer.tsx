import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ReduxStateType} from "../../redux/redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {Preloader} from "../common/Preloader/Preloader";
import {Users} from "./Users";
import {FilterType, getUsers} from "../../redux/users-reducer";


const UsersContainer = () => {

    const {usersOnPage, users,totalUsersCount,filter,portionSize,currentPage,isFetching} = useSelector((state:ReduxStateType) => state.usersPage)
    const dispatch = useDispatch()

    const onPageChanged = (pageNumber:number) => {
        dispatch(getUsers(pageNumber,usersOnPage,filter))
    }
    const onFilterChanged = (filter:FilterType) => {
        dispatch(getUsers(1,usersOnPage,filter))
    }

    return <>
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

export default compose<React.ComponentType>(WithAuthRedirect)(UsersContainer)