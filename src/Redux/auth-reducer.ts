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
