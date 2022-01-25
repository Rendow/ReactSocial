import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export type MessagesType = {
    id: number
    messages: string
}

export type DialogsType = {
    id: number
    name: string
}

const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Anya'},
        {id: 4, name: 'Sveta'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'},
    ] as DialogsType[],
    messages: [
        {id: 1, messages: 'Hi'},
        {id: 2, messages: 'How are you?'},
        {id: 3, messages: 'Good'},
    ] as MessagesType[]
}

export const slice = createSlice({
    name: 'dialogs',
    initialState: initialState,
    reducers: {
        sendMessageCreator(state,action) {
            state.messages = [...state.messages,{id: new Date().getTime(), messages: action.payload}]}
        }
    ,
    extraReducers: (builder) => {
    }
})


export const {sendMessageCreator} = slice.actions

export const dialogsReducer = slice.reducer
