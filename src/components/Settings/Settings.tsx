import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {changeTheme} from "../../redux/app-reducer";
import {ReduxStateType} from "../../redux/redux-store";
import SuperButton from "../common/Button/SuperButton";
import s from "./Settings.module.scss";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


 function Settings  () {
    useEffect(() => {
        document.title = 'Settings'
    },[])

     const [disable, setDisable] = useState(false)
     const dispatch = useDispatch()
     const theme = useSelector<ReduxStateType,string>((state) => state.app.theme)

     const thisTheme = theme === 'light' ? 'dark' : 'light'
     const title = theme === 'light'? 'Set rocket as wallpaper' : 'Remove rocket from wallpaper'

     const changeThemeHandler = () => {
         if (theme === 'light') setDisable(true);

         dispatch(changeTheme(thisTheme))
         document.body.className = thisTheme

         if (theme === 'light') setTimeout(() => {
             setDisable(false)
         }, 6000);
     }

    return (
        <div className={s.container}>
            <div>{title}</div>
            <SuperButton className={s.btn} disabled={disable} onClick={changeThemeHandler}> Click</SuperButton>
        </div>
    )
}

export default compose<React.ComponentType>(WithAuthRedirect)(Settings)

