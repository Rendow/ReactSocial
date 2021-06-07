import {authAPI, ResultCode} from "../api/api";
import {AppThunkType, ReduxStateType} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkDispatch} from "redux-thunk";

const SET_USER_DATA = 'AUTH/SET_USER_DATA';


export type AuthActionType = SetUserDataActionType
type SetUserDataActionType = ReturnType<typeof setAuthUserData>

let initialState: InitialStateType = {
    userId: 16107,
    email: null,
    login: null,
    isAuth:false,
}

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId:number| null, email:string| null, login:string| null,isAuth: boolean) => {
    return {
        type: SET_USER_DATA, payload:{userId,email,login,isAuth}
    } as const
}

//with async
export const authUser = ():AppThunkType =>
    async (dispatch) => {
      let response = await  authAPI.me();

                if (response.resultCode === ResultCode.Success) {
                    let {id, login, email} = response.data
                    dispatch(setAuthUserData(id, email, login, true))
                }
}

export const login = (email:string, password:string, rememberMe:boolean) =>
    async (dispatch: ThunkDispatch<ReduxStateType, unknown, AuthActionType | FormAction>) => {
        let response = await  authAPI.login(email, password, rememberMe);

                if (response.data.resultCode === ResultCode.Success) {
                    dispatch(authUser())
                } else {
                 let message = response.data.messages.length> 0
                     ? response.data.messages
                     : 'Something is wrong'
                    dispatch(stopSubmit('login',{_error: message}))
                }
    }

//without async
export const logout = ():AppThunkType => {
    return (dispatch) => {
        authAPI.logout()
            .then(data => {
                if (data.data.resultCode === ResultCode.Success) {
                    dispatch(setAuthUserData(null,null,null,false))
                }
            })
    }
}