import {applyMiddleware, combineReducers, createStore} from "redux";
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

export type ReduxStateType = ReturnType<typeof rootReducer>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type ReduxActionType = AuthActionType | UsersActionType | DialogActionType | ProfileActionType | AppActionType
export type AppThunkType <ReturnType = void> = ThunkAction<ReturnType, ReduxStateType,unknown, ReduxActionType>

export default store