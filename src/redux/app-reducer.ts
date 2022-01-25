import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authUser} from "./auth-reducer";


//
// export const initializedSuccess = () => {
//     return {
//         type: INITIALIZED_SUCCESS
//     } as const
// }
// export const changeTheme = (theme: string) => {
//     return {
//         type: CHANGE_THEME, theme
//     } as const
// }


export const slice = createSlice({
    name: 'app',
    initialState: {
        initialized: false,
        theme: 'light',
    },
    reducers: {
        changeTheme(state,action) {
            state.theme = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initialize.fulfilled, (state) => {
                state.initialized = true
            })

    }
})

export const initialize = createAsyncThunk('app/initialize', async (param, thunkAPI) => {
    try {
        const promise = thunkAPI.dispatch(authUser())
        await Promise.all([promise])
    } catch (error) {

    }
})
export const {changeTheme} = slice.actions

export const appReducer = slice.reducer

// type authSagaType = ReturnType<typeof authUserWorkerSaga>
// //
// // export function* initializeWorkerSaga() {
// //     let promise: authSagaType = yield call(authUserWorkerSaga)
// //
// //     function resolvedPromise() {
// //         return Promise.all([promise])
// //     }
// //
// //     yield call(resolvedPromise)
// //     yield put(initializedSuccess())
// // }
// //
// // export const initialize = () => ({type: 'APP/INITIALIZE'})
// //
// // export function* appWatcherSaga() {
// //     yield takeEvery('APP/INITIALIZE', initializeWorkerSaga)
// //
// // }
// export const initialize = (): AppThunkType =>
//     (dispatch) => {
//         let promise = dispatch(authUser())
//         Promise.all([promise])
//             .then(() => {
//                 dispatch(initializedSuccess())
//             })
//     }


//
// const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS';
// const CHANGE_THEME = 'APP/CHANGE_THEME';
//
//
// let initialState: InitialStateType = {
//     initialized: false,
//     theme: 'light',
// }
//
// export type AppActionType = ReturnType<typeof initializedSuccess> | ReturnType<typeof changeTheme>
// export type InitialStateType = {
//     initialized:boolean
//     theme:string
// }
//
// export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
//
//     switch (action.type) {
//         case INITIALIZED_SUCCESS:
//             return {...state, initialized:true}
//         case CHANGE_THEME:{
//          return {...state, theme: action.theme}
//         }
//         default:
//             return state
//     }
// }



// export const initialize = (): AppThunkType =>
//     (dispatch) => {
//         let promise = dispatch(authUser())
//         Promise.all([promise])
//             .then(() => {
//                 dispatch(initializedSuccess())
//             })
//     }

