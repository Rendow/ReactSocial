import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {AppActionType, AppThunkType} from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA';


export type AuthActionType = SetUserDataActionType
type SetUserDataActionType = ReturnType<typeof setAuthUserData>

let initialState: InitialStateType = {
    userId: null,
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
                ...action.data,
                isAuth:true
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId:number, email:string, login:string) => {
    return {
        type: SET_USER_DATA, data:{userId,email,login}
    } as const
}

export const authUser = ():AppThunkType => {
    return (dispatch) => {
        authAPI.me()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data
                    dispatch(setAuthUserData(id, email, login))
                }
            })
    }
}

export const login = (rememberMe:boolean, password:string, email:string):AppThunkType => {
    return (dispatch) => {
        authAPI.login(rememberMe, password, email)
            .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(authUser())
                }
            })
    }
}