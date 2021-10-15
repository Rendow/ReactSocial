import React from 'react';
import s from "./Users.module.css";
import logo from "./img/logo2.png";
import {follow, unFollow, UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import SuperButton from "../common/Button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {getFollowingInProgress} from "../../redux/users-selectors";

type UserPropsType = {
    users: UsersType
}

export const User: React.FC<UserPropsType> = ({users,...props}) => {
    const dispatch = useDispatch()
    const followingInProgress = useSelector(getFollowingInProgress)

    let checkedStatus = users.status === null ? 'Hello!' : users.status

    let strOne,  strTwo
    const array = checkedStatus.split('')
    if (checkedStatus.length > 20) {
        const array = checkedStatus.split('')
        const result = [], length = Math.floor(array.length / 2);
        while(array.length) result.push(array.splice(0,length));

        strOne = result[0].join('')
        strTwo = result[1].join('')
    }

    return (
        <div className={s.userWrap}>
            <span>
                    <div>
                        <NavLink to={'/profile/' + users.id}>
                            <img src={users.photos.small != null ? users.photos.small : logo} className={s.photo}/>
                        </NavLink>
                </div>

                </span>
            <span className={s.userInfoWrap}>
                    <span style={{cursor:'default'}}>
                        <div> {users.name}</div>

                        {!!array && array.length < 20
                            ?  <div  style={{fontStyle:'italic', fontSize:'16px'}}> {checkedStatus}</div>
                            : <div  style={{fontStyle:'italic', fontSize:'16px'}}>
                                {strOne} <br/> {strTwo}
                            </div>}
                    </span>

                         <div  style={{marginLeft:'-3px'}}>

                        {  users.followed
                            ? <SuperButton
                                style={{letterSpacing:'1px', fontSize:'14px'}}
                                disabled={followingInProgress.some(id => id === users.id)}
                                onClick={() => {dispatch(unFollow(users.id))}}>
                                UNFOLLOW
                            </SuperButton>
                            : <SuperButton  style={{letterSpacing:'1px', fontSize:'14px'}}
                                            disabled={followingInProgress.some(id => id === users.id)}
                                            onClick={() => {dispatch(follow(users.id))}}>
                                FOLLOW
                            </SuperButton>
                        }

                    </div>
                </span>
        </div>

)}