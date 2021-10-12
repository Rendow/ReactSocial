import {authUser} from "./auth-reducer";
import {AppThunkType} from "./redux-store";

const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS';
const CHANGE_THEME = 'APP/CHANGE_THEME';



let initialState: InitialStateType = {
    initialized:false,
    theme:'light',
}

export type AppActionType = ReturnType<typeof initializedSuccess> | ReturnType<typeof changeTheme>
export type InitialStateType = {
    initialized:boolean
    theme:string
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized:true}
        case CHANGE_THEME:{
         return {...state, theme: action.theme}
        }
        default:
            return state
    }
}

export const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    } as const
}
export const changeTheme = (theme:string) => {
    return {
        type: CHANGE_THEME, theme
    } as const
}

export const initialize = (): AppThunkType =>
    (dispatch) => {
        let promise = dispatch(authUser())
        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess())
            })
    }

