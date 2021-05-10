import {authAPI} from "../api/api";
import {AppThunkType} from "./redux-store";

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
                ...action.payload,
                isAuth:true
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

export const authUser = ():AppThunkType => {
    return (dispatch) => {
        authAPI.me()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data
                    dispatch(setAuthUserData(id, email, login, true))
                }
            })
    }
}

export const login = (email:string, password:string, rememberMe:boolean):AppThunkType => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(authUser())
                }
            })
    }
}
export const logout = ():AppThunkType => {
    return (dispatch) => {
        authAPI.logout()
            .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(setAuthUserData(null,null,null,false))
                }
            })
    }
}