import React, {useEffect, useRef, useState} from "react";
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
    const theme = useSelector<ReduxStateType, string>((state) => state.app.theme)

    const imgRef = useRef<HTMLImageElement | null>(null)
    const divRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (theme === 'dark') {
            fly()
        } else {
            landing()
        }
    }, [theme])


    const fly = async () => {
        if (divRef && divRef.current) divRef.current.style.marginLeft = '85px'

        imgRef.current?.classList.add(s.logoMove)
        await ignition()
        await start()
        if (imgRef && imgRef.current) imgRef.current.style.display = 'none';

    }

    const ignition = () => {
        return new Promise<void>(res => {
            imgRef.current?.animate({transform: 'rotate(1400deg)'}, 500)

            setTimeout(() => {
                res()
            }, 500)
        })
    }
    const start = () => {
        return new Promise<void>(res => {
            let left = imgRef.current?.getBoundingClientRect().left
            let top = imgRef.current?.getBoundingClientRect().top
            imgRef.current?.animate([
                { // from
                    transform: 'rotate(90deg)',
                    left: left + 'px',
                    top: top + 'px',
                    boxShadow: '-3px 1px 1px rgba(126, 27, 27, 0.84)',
                },
                { // to
                    transform: 'rotate(60deg)',
                    left: left && left + 990 + 'px',
                    top: top && top + 900 + 'px',
                    boxShadow: '-25px 15px 15px rgba(126, 27, 27, 0.84)',
                }
            ], 5000)

            setTimeout(() => {
                res()
            }, 4900)
        })
    }
    const landing = () => {
        imgRef.current?.classList.remove(s.logoMove)
        if (divRef && divRef.current) divRef.current.style.marginLeft = '15px'
        if (imgRef && imgRef.current) imgRef.current.style.display = 'unset';
    }

    let wrapClass = theme === 'light' ? s.header : s.header + ' ' + s.opacity
    return (
        <header className={wrapClass}>
            <div className={s.wrap}>
                <div className={s.logo}><img ref={imgRef} src={logo} alt=""/>
                    <div ref={divRef} className={s.brand}>SOCIAL NETWORK</div>
                </div>
                <div className={s.loginBlock}>
                    {props.isAuth
                        ? <div>
                            <NavLink to={'/profile'}> {props.login} </NavLink>
                            <SuperButton
                                style={{
                                    fontSize: '12px',
                                    width: '60px',
                                    margin: '0 0 0 8px',
                                    padding: '4px',
                                    background: '#303f9f',
                                    color: 'white',
                                }}
                                // className={s.outButton}
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