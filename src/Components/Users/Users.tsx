import React from 'react';
import {dispatchToPropsType, mapStateToPropsType} from './UsersContainer';
import s from './Users.module.css';
import axios from 'axios';
import logo from './img/logo.png';



type UsersPropsType = mapStateToPropsType & dispatchToPropsType

export function Users(props: UsersPropsType) {
    if (props.users.length === 0) {

        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response =>{
            props.setUsers(response.data.items)
        })

    }

    return (

        <div> {
            props.users.map(u => <div className={s.wrap} key={u.id}>
                <span>
                    <div>
                    <img src={u.photos.small != null ? u.photos.small : logo} className={s.photo}/>
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
            </div>)
        }</div>
    )
}

