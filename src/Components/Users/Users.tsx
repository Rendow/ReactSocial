import React from 'react';
import s from "./Users.module.css";
import logo from "./img/logo.png";
import {UsersType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import {userAPI} from "../../api/api";
import {Button} from "@material-ui/core";


type UsersPropsType = {
    onPageChanged: (pageNumber: number) => void
    users: UsersType[]
    pageSize: number
    totalUsersCount:number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleIsFollowingProgress:(followingInProgress: boolean, userId:number) => void
    followingInProgress:number[]
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
                        {
                            u.followed
                                ? <Button
                                    variant={"contained"}
                                    style={{margin:'5px 0'}}
                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => {props.unfollow(u.id)}}>
                                    Unfollow  </Button>

                            :  <Button
                                    color={"primary"}
                                    variant={"contained"}
                                    style={{margin:'5px 0'}}
                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => {props.follow(u.id)}}>
                                Follow  </Button>
                        }
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