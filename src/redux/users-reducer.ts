import {userAPI} from "../api/api";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


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


export type UsersActionType = FollowActionType | UnFollowActionType | SetUsersActionType | setCurrentPageActionType | setUsersTotalCountActionType | setIsFetchingACActionType | toggleIsFollowingProgressActionType

type FollowActionType = ReturnType<typeof followSuccess>
type UnFollowActionType = ReturnType<typeof unFollowSuccess>
type SetUsersActionType = ReturnType<typeof setUsers>
type setCurrentPageActionType = ReturnType<typeof setCurrentPage>
type setUsersTotalCountActionType = ReturnType<typeof setTotalUsersCount>
type setIsFetchingACActionType = ReturnType<typeof toggleIsFetching>
type toggleIsFollowingProgressActionType = ReturnType<typeof toggleIsFollowingProgress>


let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 3,
    isFetching:false,
    followingInProgress:[],
}

export type InitialStateType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching:boolean
    followingInProgress:number[]
}

export const usersReducer = (state: InitialStateType = initialState, action: UsersActionType): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id =>  id !== action.userId)
            }
        }
        default:
            return state
    }
}


export const followSuccess = (id: number) => {
    return {
        type: FOLLOW, userID: id
    } as const
}

export const unFollowSuccess = (id: number) => {
    return {
        type: UNFOLLOW, userID: id
    } as const
}
export const setUsers = (users: UsersType[]) => {
    return {
        type: SET_USERS, users: users
    } as const
}
export const setCurrentPage = (page: number) => {
    return {
        type: SET_CURRENT_PAGE, currentPage: page
    } as const
}
export const setTotalUsersCount = (count: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT, totalCount: count
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING, isFetching
    } as const
}
export const toggleIsFollowingProgress = (followingInProgress: boolean, userId:number) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId
    } as const
}

export const getUsers = (pageSize: number, currentPage: number) => {
    return (dispatch: Dispatch<UsersActionType>) => {
        dispatch(toggleIsFetching(true))
        userAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))

            })
    }
}
export const getPage = (pageNumber: number, currentPage: number) => {
    return (dispatch: Dispatch<UsersActionType>) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(toggleIsFetching(true))

        userAPI.getUsers(pageNumber, currentPage)
            .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))

            })
    }
}
export const follow = (userId:number) => {
    return (dispatch: Dispatch<UsersActionType>) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        userAPI.followUser(userId)
            .then(data => {
                if (data.resultCode === 0) {
                dispatch(followSuccess(userId))
            }
                dispatch(toggleIsFollowingProgress(false, userId))
            })
    }
}
export const unFollow = (userId:number) => {
    return (dispatch: Dispatch<UsersActionType>) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        userAPI.unFollowUser(userId)
            .then(data => {
                if (data.resultCode === 0){
                    dispatch(unFollowSuccess(userId))
                }
                dispatch(toggleIsFollowingProgress(false, userId))
            })
    }
}