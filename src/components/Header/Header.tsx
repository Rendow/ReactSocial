import React from "react";
import {NavLink} from "react-router-dom";
import s from './Header.module.css';
import logo from './logo/rocket33.png';
import SuperButton from "../common/Button/SuperButton";
import {useSelector} from "react-redux";
import {ReduxStateType} from "../../redux/redux-store";

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

function Header(props:HeaderPropsType) {
    const theme = useSelector<ReduxStateType,string>((state) => state.app.theme)
    let wrapClass = theme === 'light'? s.header  : s.header +' '+ s.opacity

    return (
        <header className={wrapClass}>
            <div className={s.wrap}>
                <div className={s.logo}> <img src={logo} alt=""/> <div className={s.brand}>SOCIAL NETWORK </div> </div>
                <div className={s.loginBlock}>
                    {props.isAuth
                        ? <div>
                            <NavLink  to={'/profile'}> {props.login} </NavLink>
                            <SuperButton
                                className={s.logoutButton}
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