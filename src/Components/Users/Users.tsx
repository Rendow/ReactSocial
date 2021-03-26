import React from 'react';
import {dispatchToPropsType, mapStateToPropsType} from './UsersContainer';
import s from './Users.module.css';


type UsersPropsType = mapStateToPropsType & dispatchToPropsType

export function Users(props: UsersPropsType) {
    debugger
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'http://www.granadoespada.com/uploads/character/0a5be4bf6ba103f9534e7e82e12e0f0d.png',
                followed: false,
                fullName: 'Dmitriy',
                status: ' I am a boss',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 2,
                photoUrl: 'http://www.granadoespada.com/uploads/character/0a5be4bf6ba103f9534e7e82e12e0f0d.png',
                followed: true,
                fullName: 'Oleg',
                status: ' I am a boss',
                location: {city: 'Kiev', country: 'Ukraine'}
            },
            {
                id: 3,
                photoUrl: 'http://www.granadoespada.com/uploads/character/0a5be4bf6ba103f9534e7e82e12e0f0d.png',
                followed: false,
                fullName: 'Ivan',
                status: ' I am a boss',
                location: {city: 'Moscow', country: 'Russia'}
            },
        ])
    }

    return (

        <div> {
            props.users.map(u => <div className={s.wrap} key={u.id}>
                <span>
                    <div>
                    <img src={u.photoUrl} className={s.photo}/>
                </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                            : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
                    </div>
                </span>
                <span> 
                    <span>
                        <div> {u.fullName}</div>
                        <div> {u.status}</div>
                    </span>
                    <span>
                         <div>{u.location.country}</div>
                         <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)
        }</div>
    )
}

