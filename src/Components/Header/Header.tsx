import React from "react";
import { NavLink } from "react-router-dom";
import classes from './Header.module.css';
import logo from './logo/logo.png';

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
}

function Header(props:HeaderPropsType) {
    return (
        <header className={classes.header}>
            <div className={classes.wrap}>
                <div className={classes.logo}><img  src={logo} alt=""/></div>
                <div className={classes.loginBlock}>
                    {props.isAuth ? props.login : <NavLink to={'./Login'}> Login </NavLink>}
                </div>
            </div>
        </header>
    )
}

export default Header;