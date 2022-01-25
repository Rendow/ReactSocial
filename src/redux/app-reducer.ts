import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authUser} from "./auth-reducer";


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

