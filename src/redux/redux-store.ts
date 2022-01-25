import {combineReducers, compose} from "redux";
import { dialogsReducer} from "./dialogs-reducer";
import { profileReducer} from "./propfile-reducer";
import { usersReducer} from "./users-reducer";
import { authReducer} from "./auth-reducer";
import {reducer as formReducer} from 'redux-form'
import { appReducer} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
})
export const store = configureStore({
    reducer: rootReducer,
});

export type ReduxStateType = ReturnType<typeof rootReducer>

// аналог ReturnType, но для типизации обьекта;
// если переданное значение(Т) соотвествует ключ-массив аргументов, infer запишет этот тип в U и вернет его
//https://habr.com/ru/company/alfa/blog/452620/
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

// @ts-ignore
window.store = store


export default store
