import {applyMiddleware, combineReducers, createStore} from "redux";
import {sidebarReducer} from "./sidebar-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./propfile-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer } from 'redux-form'

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



export default store