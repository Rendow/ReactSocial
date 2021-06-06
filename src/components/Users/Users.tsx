import React from 'react';
import s from "./Users.module.css";
import logo from "./img/logo.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import SuperButton from "../common/FormsControl/SuperButton";
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
}

export const Users : React.FC<UsersPropsType> = (
    {users,currentPage,pageSize,
        onPageChanged,totalUsersCount,...props}) => {

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
                pageSize={pageSize}
                totalUsersCount={totalUsersCount}
            />
        </div>

)}