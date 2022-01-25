import {CommonType, userAPI} from "../api/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

type FollowFlow = {
    userId: number
    apiMethod: (userId: number) => Promise<CommonType>
    actionCreator:   (id: number) => (ReturnType<typeof unFollowSuccess> | ReturnType<typeof followSuccess>)
}
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
    }
})


export const {followSuccess,setFilter,unFollowSuccess,setUsers,setCurrentPage,setTotalUsersCount,toggleIsFetching,toggleIsFollowingProgress} = slice.actions

export const usersReducer = slice.reducer

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

export const follow = createAsyncThunk('users/follow', async (userId:number, thunkAPI) => {
    try {
        const apiMethod = userAPI.unFollowUser.bind(userAPI)
        followUnFollowFlow({ userId,  apiMethod, actionCreator:followSuccess})
    } catch (error) {

    }
})

export const unFollow = createAsyncThunk('users/un-follow', async (userId:number, thunkAPI) => {
    try {
        const apiMethod = userAPI.unFollowUser.bind(userAPI)
        followUnFollowFlow({userId,  apiMethod,  actionCreator:unFollowSuccess})
    } catch (error) {

    }
})
