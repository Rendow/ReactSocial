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
            imgRef.current?.animate({transform: 'rotate(2120deg)'}, 1000)

            setTimeout(() => {
                res()
            }, 1000)
        })
    }
    const start = () => {
        return new Promise<void>(res => {
            imgRef.current?.animate([
                { // from
                    transform: 'rotate(90deg)',
                    //  marginLeft:'10px',
                    //  offsetDistance: '0%',
                    left: '0',
                    top: '0',
                    boxShadow: '1px 1px 1px black',
                    //borderRadius:'0%',

                    //  easing: 'ease-in',
                },
                { // to
                    transform: 'rotate(55deg)',
                    // marginLeft:'260px',
                    // offsetDistance: '100%',
                    left: '990px',
                    top: '900px',
                    boxShadow: '10px 10px 10px black',
                    // display:'none',
                    //  borderRadius:'50%',
                    // easing:  'ease-out' ,
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