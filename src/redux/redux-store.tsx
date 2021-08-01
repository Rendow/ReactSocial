import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {sidebarReducer} from "./sidebar-reducer";
import {DialogActionType, dialogsReducer} from "./dialogs-reducer";
import {ProfileActionType, profileReducer} from "./propfile-reducer";
import {UsersActionType, usersReducer} from "./users-reducer";
import {AuthActionType, authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import {AppActionType, appReducer} from "./app-reducer";

export const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth:authReducer,
    app:appReducer,
    form:formReducer
})

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type ReduxStateType = ReturnType<typeof rootReducer>

// аналог ReturnType для типизации обьекта экшенов; если переданное значение соотвествует ключ-массив аргументов - выведется тип
//infer — выведение типов в typescript
//https://habr.com/ru/company/alfa/blog/452620/
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.store = store

export type ReduxActionType = AuthActionType | UsersActionType | DialogActionType | ProfileActionType | AppActionType
export type AppThunkType <ReturnType = void> = ThunkAction<ReturnType, ReduxStateType,unknown, ReduxActionType>

export default store