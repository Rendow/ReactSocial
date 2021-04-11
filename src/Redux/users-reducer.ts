const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';


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


export type DispatchType = FollowActionType | UnFollowActionType | SetUsersActionType | setCurrentPageActionType | setUsersTotalCountActionType

type FollowActionType = ReturnType<typeof followAC>
type UnFollowActionType = ReturnType<typeof unfollowAC>
type SetUsersActionType = ReturnType<typeof setUsersAC>
type setCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
type setUsersTotalCountActionType = ReturnType<typeof setUsersTotalCountAC>


let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2
}

export type InitialStateType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

export const usersReducer = (state: InitialStateType = initialState, action: DispatchType): InitialStateType => {

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
            return {...state, users: [...action.users, ...state.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }

        default:
            return state
    }
}


export const followAC = (id: number) => {
    return {
        type: FOLLOW, userID: id
    } as const
}

export const unfollowAC = (id: number) => {
    return {
        type: UNFOLLOW, userID: id
    } as const
}
export const setUsersAC = (users: UsersType[]) => {
    return {
        type: SET_USERS, users: users
    } as const
}
export const setCurrentPageAC = (page: number) => {
    return {
        type: SET_CURRENT_PAGE, currentPage: page
    } as const
}
export const setUsersTotalCountAC = (count: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT, totalCount: count
    } as const
}