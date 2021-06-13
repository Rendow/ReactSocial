import React, {useEffect} from 'react';
import s from "./Users.module.css";
import {UsersType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";


type UsersPropsType = {
    onPageChanged: (pageNumber: number) => void
    users: UsersType[]
    pageSize: number
    totalUsersCount:number
    currentPage: number
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress:number[]
    portionNumber:number
}

export const Users : React.FC<UsersPropsType> = (
    {users,currentPage,pageSize: usersOnPage,
        onPageChanged,totalUsersCount,portionNumber,...props}) => {

    useEffect(() => {
        document.title = 'Users'
    },[])

    return (
        <div className={s.wrap}>
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
                portionNumber={portionNumber}
            />
        </div>

)}