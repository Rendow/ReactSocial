import {combineReducers, createStore} from "redux";
import {sidebarReducer} from "./sidebar-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./propfile-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";

export const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth:authReducer,
})

export type ReduxStateType = ReturnType<typeof rootReducer>

let store = createStore(rootReducer)



export default store