import {applyMiddleware, combineReducers, createStore} from "redux";
import {sidebarReducer} from "./sidebar-reducer";
import {DialogActionType, dialogsReducer} from "./dialogs-reducer";
import {ProfileActionType, profileReducer} from "./propfile-reducer";
import {UsersActionType, usersReducer} from "./users-reducer";
import {AuthActionType, authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'

export const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth:authReducer,
    form:formReducer
})

export type ReduxStateType = ReturnType<typeof rootReducer>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppActionType = AuthActionType | UsersActionType | DialogActionType | ProfileActionType
export type AppThunkType <ReturnType = void> = ThunkAction<ReturnType, ReduxStateType,unknown, AppActionType>

export default store