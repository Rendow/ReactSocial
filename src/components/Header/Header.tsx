import React from "react";
import {NavLink} from "react-router-dom";
import classes from './Header.module.css';
import logo from './logo/rocket33.png';
import SuperButton from "../common/FormsControl/SuperButton";

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

function Header(props:HeaderPropsType) {

    return (
        <header className={classes.header}>
            <div className={classes.wrap}>
                <div className={classes.logo}> <img  src={logo} alt=""/> <div className={classes.brand}>SOCIAL NETWORK </div> </div>
                <div className={classes.loginBlock}>
                    {props.isAuth
                        ? <div>
                            <NavLink  to={'/profile'}> {props.login} </NavLink>
                            <SuperButton
                                style={{fontSize: '12px', width: '60px', margin: '0 0 0 8px', padding: '4px'}}
                                onClick={props.logout}>
                                Log out
                            </SuperButton>
                        </div>
                        : <NavLink to={'/login'}> Login </NavLink>}
                </div>
            </div>
        </header>
    )
}

export default Header;