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
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type ReduxStateType = ReturnType<typeof rootReducer>

// аналог ReturnType, но для типизации обьекта;
// если переданное значение(Т) соотвествует ключ-массив аргументов, infer запишет этот тип в U и вернет его
//https://habr.com/ru/company/alfa/blog/452620/
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
// const sagaMiddleWare = createSagaMiddleware()
//
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleWare)))
// @ts-ignore
window.store = store


// sagaMiddleWare.run(rootWatcher)
//
// function* rootWatcher() {
//     yield all([appWatcherSaga(), authWatcherSaga()])
// }

//
// export type ReduxActionType =
//     AuthActionType
//     | UsersActionType
//     | DialogActionType
//     | ProfileActionType
//     | AppActionType
//
// export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, ReduxStateType, unknown, ReduxActionType>

export default store
