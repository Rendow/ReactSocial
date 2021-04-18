import React from 'react';
import s from "./Users.module.css";
import logo from "./img/logo.png";
import {UsersType} from "../../Redux/users-reducer";
import { NavLink } from "react-router-dom";


type UsersPropsType = {
    onPageChanged: (pageNumber: number) => void
    users: UsersType[]
    pageSize: number
    totalUsersCount:number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void

}


export const Users = (props:UsersPropsType) => {

    let selectedPage = s.selectedPage + ' ' + s.pagination
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages:number[] = []

    for (let i = 1;i <= pagesCount ;i++){
        pages.push(i)
    }

    return (
        <div>
            {props.users.map(u => <div className={s.wrap} key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : logo} className={s.photo}/>
                        </NavLink>

                </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                            : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div> {u.name}</div>
                        <div> {u.status}</div>
                    </span>
                    <span>
                         <div>{'u.location.country'}</div>
                         <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)}

            <div>
                {pages.map(p => {
                    return  p <15 && <span className={props.currentPage === p ? selectedPage : s.pagination}
                                           onClick={()=>{props.onPageChanged(p)}}>
                       {p} </span>  })}
            </div>
        </div>

)}