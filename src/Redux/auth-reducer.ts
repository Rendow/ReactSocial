import {Dispatch} from "redux";
import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';


export type DispatchType = SetUserDataActionType
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

export const authReducer = (state: InitialStateType = initialState, action: DispatchType): InitialStateType => {

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
export const authUser = () => {
    return (dispatch: Dispatch<DispatchType>) => {
        authAPI.me()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data
                    dispatch(setAuthUserData(id, email, login))
                }
            })
    }
}