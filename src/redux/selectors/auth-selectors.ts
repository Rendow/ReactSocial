import {ReduxStateType} from "../redux-store";


export const getCapthcaUrl = (state: ReduxStateType):string | null =>  state.auth.captchaURL
export const getIsAuth = (state: ReduxStateType):boolean =>  state.auth.isAuth
export const authorizedUserId = (state: ReduxStateType):number | null =>  state.auth.userId

