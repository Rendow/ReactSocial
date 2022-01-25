import {CommonType, userAPI} from "../api/api";
import {Dispatch} from "redux";
import {InferActionTypes} from "./redux-store";
import {ActionCreatorWithPayload, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authUser} from "./auth-reducer";

export type UsersType = {
    id: number
    photoUrl: string
    followed: boolean
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    location: {
        city: string
        country: string
    }
}

 type InitialStateType = {
    users: UsersType[]
    usersOnPage: number
    totalUsersCount: number
    currentPage: number
    isFetching:boolean
    followingInProgress:number[]
    portionSize:number
    filter:{
        term:string
        friend:null | boolean
    }
}
export type FilterType = typeof initialState.filter
// type FollowActionType = ReturnType<typeof actions.followSuccess>
// type UnFollowActionType = ReturnType<typeof actions.unFollowSuccess>
// export type UsersActionType = InferActionTypes<typeof actions>

const initialState: InitialStateType = {
    users: [],
    usersOnPage: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching:false,
    followingInProgress:[],
    portionSize:15,
    filter:{
        term:'',
        friend:null
    }
}
// export const usersReducer = (state: InitialStateType = initialState, action: UsersActionType): InitialStateType => {
//     switch (action.type) {
//         case 'FOLLOW':
//             return {
//                 ...state,
//                 users: state.users.map(u => {
//                     if (u.id === action.userID) {
//                         return {...u, followed: true}
//                     }
//                     return u
//                 })
//             }
//
//         case 'UNFOLLOW':
//             return {
//                 ...state,
//                 users: state.users.map(u => {
//                     if (u.id === action.userID) {
//                         return {...u, followed: false}
//                     }
//                     return u
//                 })
//             }
//         case 'SET_USERS': {
//             return {...state, users: [...action.users]}
//         }
//         case 'SET_CURRENT_PAGE': {
//             return {...state, currentPage: action.currentPage}
//         }
//         case 'SET_TOTAL_USERS_COUNT': {
//             return {...state, totalUsersCount: action.totalCount}
//         }
//         case 'TOGGLE_IS_FETCHING': {
//             return {...state, isFetching: action.isFetching}
//         }
//         case 'FILTER': {
//             return {...state, filter: action.payload}
//         }
//         case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
//             return {
//                 ...state,
//                 followingInProgress: action.followingInProgress
//                     ? [...state.followingInProgress, action.userId]
//                     : state.followingInProgress.filter(id =>  id !== action.userId)
//             }
//         }
//         default:
//             return state
//     }
// }
export const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        followSuccess(state,action) {
            state.users = state.users.map(user => {
            return  user.id === action.payload.userID
                ? {...user, followed: true}
                : user
            })
        },
        unFollowSuccess(state,action) {
            state.users = state.users.map(user => {
            return  user.id === action.payload.userID
                ? {...user, followed: false}
                : user
            })
        },
        setFilter(state,action) {
            state.filter = action.payload
        },
        setUsers(state,action) {
            state.users = [...action.payload]
        },
        setCurrentPage(state,action) {
            state.currentPage = action.payload
        },
        setTotalUsersCount(state,action) {
            state.totalUsersCount = action.payload
        },
        toggleIsFetching(state,action) {
            state.isFetching = action.payload
        },
        toggleIsFollowingProgress(state,action) {
            state.followingInProgress = action.payload.followingInProgress
                ? [...state.followingInProgress, action.payload.userId]
                : state.followingInProgress.filter(id =>  id !== action.payload.userId)
        },
    },
    extraReducers: (builder) => {
       // builder
            // .addCase(initialize.fulfilled, (state) => {
            //     state.initialized = true
            // })

    }
})


export const {followSuccess,setFilter,unFollowSuccess,setUsers,setCurrentPage,setTotalUsersCount,toggleIsFetching,toggleIsFollowingProgress} = slice.actions

export const usersReducer = slice.reducer
// export const actions = {
//     followSuccess :(id: number) => ({type: 'FOLLOW', userID: id} as const),
//     setFilter :(filter:FilterType) =>  ({type: 'FILTER', payload:filter} as const),
//     unFollowSuccess :(id: number) =>  ({type: 'UNFOLLOW', userID: id} as const),
//     setUsers :(users: UsersType[]) => ({type: 'SET_USERS', users: users} as const),
//     setCurrentPage :(page: number) => ({type: 'SET_CURRENT_PAGE', currentPage: page} as const),
//     setTotalUsersCount :(count: number) => ( {type: 'SET_TOTAL_USERS_COUNT', totalCount: count} as const),
//     toggleIsFetching :(isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
//     toggleIsFollowingProgress :(followingInProgress: boolean, userId:number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', followingInProgress, userId} as const ),
// }

// export const getUsers = (currentPage: number, pageSize: number,filter:FilterType) =>
//     async (dispatch: Dispatch<UsersActionType>) => {
//         dispatch(actions.toggleIsFetching(true))
//         dispatch(actions.setCurrentPage(currentPage))
//         dispatch(actions.setFilter(filter))
//
//       const res = await  userAPI.getUsers(currentPage, pageSize,filter.term,filter.friend);
//                 dispatch(actions.toggleIsFetching(false))
//                 dispatch(actions.setUsers(res.items))
//                 dispatch(actions.setTotalUsersCount(res.totalCount))
//     }
export const getUsers = createAsyncThunk('users/get-users', async ({currentPage,pageSize,filter}:{currentPage: number, pageSize: number,filter:FilterType}, thunkAPI) => {
    try {
        thunkAPI.dispatch(toggleIsFetching(true))
        thunkAPI.dispatch(setCurrentPage(currentPage))
        thunkAPI.dispatch(setFilter(filter))

        const res = await  userAPI.getUsers(currentPage, pageSize,filter.term,filter.friend);
        thunkAPI.dispatch(toggleIsFetching(false))
        thunkAPI.dispatch(setUsers(res.items))
        thunkAPI.dispatch(setTotalUsersCount(res.totalCount))
    } catch (error) {

    }
})
// export const getPage = (pageNumber: number, currentPage: number) =>
//     async (dispatch: Dispatch<UsersActionType>) => {
//         dispatch(actions.setCurrentPage(pageNumber))
//         dispatch(actions.toggleIsFetching(true))
//
//         const res = await userAPI.getUsers(pageNumber, currentPage);
//                 dispatch(actions.toggleIsFetching(false))
//                 dispatch(actions.setUsers(res.items))
//     }
export const getPage = createAsyncThunk('users/get-page', async ({pageNumber, currentPage}:{pageNumber: number, currentPage: number}, thunkAPI) => {
    try {
        thunkAPI.dispatch(setCurrentPage(pageNumber))
        thunkAPI.dispatch(toggleIsFetching(true))

        const res = await userAPI.getUsers(pageNumber, currentPage);
        thunkAPI.dispatch(toggleIsFetching(false))
        thunkAPI.dispatch(setUsers(res.items))
    } catch (error) {

    }
})
type FollowFlow = {
    userId: number
    apiMethod: (userId: number) => Promise<CommonType>
     actionCreator:   (id: number) => (ReturnType<typeof unFollowSuccess> | ReturnType<typeof followSuccess>)
    //actionCreator:  any
}
// const followUnFollowFlow = async (userId: number, dispatch: Dispatch<UsersActionType>, apiMethod: (userId: number) => Promise<CommonType>,
//                                   actionCreator: (id: number) => FollowActionType | UnFollowActionType) => {
//     dispatch(actions.toggleIsFollowingProgress(true, userId))
//     const res = await apiMethod(userId)
//     if (res.resultCode === 0) {
//         dispatch(actionCreator(userId))
//     }
//     dispatch(actions.toggleIsFollowingProgress(false, userId))
// }
export const followUnFollowFlow = createAsyncThunk('users/follow-un-follow-flow', async ({userId,apiMethod,actionCreator}:FollowFlow, thunkAPI) => {
    try {
        thunkAPI.dispatch(toggleIsFollowingProgress({followingInProgress: true, userId}))
        const res = await apiMethod(userId)
        if (res.resultCode === 0) {
            thunkAPI.dispatch(actionCreator(userId))
        }
        thunkAPI.dispatch(toggleIsFollowingProgress({followingInProgress: false, userId}))
    } catch (error) {

    }
})
// export const follow = (userId:number) =>
//     async (dispatch: Dispatch<UsersActionType>) => {
//
//         const apiMethod = userAPI.followUser.bind(userAPI)
//         followUnFollowFlow(userId,dispatch, apiMethod,actions.followSuccess)
//     }
export const follow = createAsyncThunk('users/follow', async (userId:number, thunkAPI) => {
    try {
        const apiMethod = userAPI.unFollowUser.bind(userAPI)
        followUnFollowFlow({ userId,  apiMethod, actionCreator:followSuccess})
    } catch (error) {

    }
})
// export const unFollow = (userId:number) =>
//     async (dispatch: Dispatch<UsersActionType>) => {
//
//         const apiMethod = userAPI.unFollowUser.bind(userAPI)
//         followUnFollowFlow(userId,dispatch, apiMethod,actions.unFollowSuccess)
//     }
export const unFollow = createAsyncThunk('users/un-follow', async (userId:number, thunkAPI) => {
    try {
        const apiMethod = userAPI.unFollowUser.bind(userAPI)
        followUnFollowFlow({userId,  apiMethod,  actionCreator:unFollowSuccess})
    } catch (error) {

    }
})
