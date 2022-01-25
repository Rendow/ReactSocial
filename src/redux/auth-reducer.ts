import {authAPI, ResultCode} from "../api/api";
import {stopSubmit} from "redux-form";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {FormDataType} from "../components/Login/Login";

const initialState: InitialStateType = {
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
type AuthUserDataType = {
    payload: {
        userId: number | null
        email: string | null
        login: string | null
        isAuth: boolean
    }
}
export const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthUserData(state,action:AuthUserDataType) {
            state.userId = action.payload.userId
            state.email = action.payload.email
            state.login = action.payload.login
            state.isAuth = action.payload.isAuth
        }
    },
    extraReducers: (builder) => {

    }
})

export const login = createAsyncThunk('auth/login', async (param:FormDataType, thunkAPI) => {
    try {
        const response = await authAPI.login(param.email, param.password, param.rememberMe,param.captchaURL);
        if (response.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(authUser())
        }
    } catch (error) {
        thunkAPI.dispatch(stopSubmit('login',{_error: error}))
    }
})

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    try {
        const response = await  authAPI.logout();
        if (response.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAuthUserData({userId: null, email: null, login: null, isAuth: false}))
        }
    } catch (error) {

    }
})

export const authUser = createAsyncThunk('auth/auth-user', async (param, thunkAPI) => {
    debugger
    try {
        const response = await  authAPI.me();
        if (response.resultCode === ResultCode.Success) {
            const {id, login, email} = response.data
            thunkAPI.dispatch(setAuthUserData({userId : id, email ,login,isAuth : true}))
        }
    } catch (error) {

    }
})

const {setAuthUserData} = slice.actions
export const authReducer = slice.reducer

