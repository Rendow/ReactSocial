import React from "react";
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css';
import {useSelector} from "react-redux";
import {ReduxStateType} from "../../redux/redux-store";

function Navbar() {
    const theme = useSelector<ReduxStateType,string>((state) => state.app.theme)

    let navClass = theme === 'light'? s.nav  : s.nav +' '+ s.opacity
    return (
        <nav className={navClass}>
            <div className={s.item}>
                <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/dialogs' activeClassName={s.active}> Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' activeClassName={s.active}> Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/chat' activeClassName={s.active}>Chat</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings' activeClassName={s.active}>Settings</NavLink>
            </div>
        </nav>

    )
}

export default Navbar;