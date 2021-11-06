import {authAPI, CommonType, MeResponseType, ResultCode, securityAPI} from "../api/api";
import {AppThunkType, ReduxStateType} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkDispatch} from "redux-thunk";
import {call, put, takeEvery} from "redux-saga/effects";
import {initializedSuccess} from "./app-reducer";


const SET_USER_DATA = 'AUTH/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


export type AuthActionType = SetUserDataActionType | GetCaptchaURLSuccess
type SetUserDataActionType = ReturnType<typeof setAuthUserData>
type GetCaptchaURLSuccess = ReturnType<typeof getCaptchaURLSuccess>

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth:false,
    captchaURL:null, //if null, captcha not required
}

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaURL: string | null
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state, captchaURL: action.payload
            }
        default:
            return state
    }
}

export type AuthUserDataType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

export const setAuthUserData = ({userId, email, login, isAuth}: AuthUserDataType) => {
    return {
        type: SET_USER_DATA, payload: {userId, email, login, isAuth}
    } as const
}
export const getCaptchaURLSuccess = (captchaURL: string) => {
    return {type: GET_CAPTCHA_URL_SUCCESS, payload: captchaURL} as const
}


//with async
// export const authUser = ():AppThunkType =>
//     async (dispatch) => {
//       let response = await  authAPI.me();
//
//                 if (response.resultCode === ResultCode.Success) {
//                     let {id, login, email} = response.data
//                     dispatch(setAuthUserData({userId : id, email : email, login : login, isAuth : true}))
//                 }
// }

export function* authUserWorkerSaga() {
    let response: CommonType<MeResponseType> = yield call(authAPI.me)

    if (response.resultCode === ResultCode.Success) {
        let {id, login, email} = response.data
        yield put(setAuthUserData({userId: id, email: email, login: login, isAuth: true}))
    }

}

export const authUser = () => ({type: 'AUTH/AUTH_USER'})

export function* authWatcherSaga() {
    yield takeEvery('AUTH/AUTH_USER', authUserWorkerSaga)

}

export const getCaptchaURL = (): AppThunkType =>
    async (dispatch) => {
        const res = await securityAPI.getCaptchaURL();

        const captchaURL = res.data.data.url
        dispatch(getCaptchaURLSuccess(captchaURL))
    }
export const login = (email: string, password: string, rememberMe: boolean, captchaURL: string | null) =>
    async (dispatch: ThunkDispatch<ReduxStateType, unknown, AuthActionType | FormAction>) => {

        let response = await  authAPI.login(email, password, rememberMe,captchaURL);

                if (response.data.resultCode === ResultCode.Success) {
                    dispatch(authUser())
                } else {
                    if (response.data.resultCode === ResultCode.Captcha) {
                        dispatch(getCaptchaURL())
                    }
                 let message = response.data.messages.length > 0
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
                    dispatch(setAuthUserData({userId: null, email: null, login: null, isAuth: false}))
                }
            })
    }
}