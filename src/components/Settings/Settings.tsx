import React, {useEffect} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {changeTheme} from "../../redux/app-reducer";
import {ReduxStateType} from "../../redux/redux-store";
import SuperButton from "../common/Button/SuperButton";
import s from "./Settings.module.css";


 function Settings  () {
    useEffect(() => {
        document.title = 'Settings'
    },[])

     const dispatch = useDispatch()
     const theme = useSelector<ReduxStateType,string>((state) => state.app.theme)

     const thisTheme = theme === 'light' ? 'dark' : 'light'
     const title = theme === 'light'? 'Set rocket as wallpaper' : 'Remove rocket from wallpaper'

     const changeThemeHandler = () => {
         dispatch(changeTheme(thisTheme))
         document.body.className = thisTheme
     }

    return (
        <div className={s.container}>
            <div>{title}</div>
            <SuperButton onClick={changeThemeHandler}> Click</SuperButton>
        </div>
    )
}

export default  compose<React.ComponentType> (withRouter)(Settings)

