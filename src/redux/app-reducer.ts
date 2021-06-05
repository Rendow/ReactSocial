import {authUser} from "./auth-reducer";
import {AppThunkType} from "./redux-store";

const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS';


type InitializedSuccessType = ReturnType<typeof initializedSuccess>

let initialState: InitialStateType = {
    initialized:false,
}

export type AppActionType = InitializedSuccessType
export type InitialStateType = {
    initialized:boolean
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized:true
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

export const initialize = (): AppThunkType =>
    (dispatch) => {
        let promise = dispatch(authUser())
        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess())
            })
    }

