import React, {useEffect} from 'react';
import s from "./Users.module.css";
import {FilterType, UsersType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {UsersSearch} from "./UsersSearch";


type UsersPropsType = {
    onPageChanged: (pageNumber: number) => void
    users: UsersType[]
    pageSize: number
    totalUsersCount:number
    currentPage: number
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress:number[]
    portionSize:number
    onFilterChanged:(filter:FilterType) => void
}

export const Users : React.FC<UsersPropsType> = (
    {onFilterChanged,users,currentPage,pageSize: usersOnPage,
        onPageChanged,totalUsersCount,portionSize,...props}) => {

    useEffect(() => {
        document.title = 'Users'
    },[])

    return (
        <div className={s.wrap}>
            <UsersSearch onFilterChanged={onFilterChanged}/>
            { users.map(u =>
                <User
                users={u}
                key={u.id}
                follow={props.follow}
                unFollow={props.unFollow}
                followingInProgress={props.followingInProgress}
                />)
            }

                <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={usersOnPage}
                portionSize={portionSize}
            />
        </div>

)}


