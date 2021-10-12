import React, {useEffect} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {changeTheme} from "../../redux/app-reducer";
import {ReduxStateType} from "../../redux/redux-store";
import SuperButton from "../common/Button/SuperButton";
import s from "./Settings.module.css";

type PathParamsType = { userId: string }

type PropsType = RouteComponentProps<PathParamsType>

 function Settings  (props:PropsType) {
    useEffect(() => {
        document.title = 'Settings'
    },[])

     const dispatch = useDispatch()
     const theme = useSelector<ReduxStateType,string>((state) => state.app.theme)

     const thisTheme = theme === 'light' ? 'dark' : 'light'

     const changeThemeHandler = () => {
         dispatch(changeTheme(thisTheme))
         document.body.className = theme
     }
let title = theme === 'light'? 'Remove rocket' :'Add rocket ?'
    return (
        <div className={s.container}>
            <div>{title}</div>
            <SuperButton onClick={changeThemeHandler}> Click</SuperButton>
        </div>
    )
}

export default  compose<React.ComponentType> (withRouter)(Settings)

//todo add set photo
//todo add set backgrounds
//todo add classname library