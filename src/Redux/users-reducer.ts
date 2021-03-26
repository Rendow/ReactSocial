const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';



export type UsersType = {
    id:number
    followed:boolean
    fullName:string
    status: string
    location: {
        city: string
        country: string
    }
}

export type DispatchType = FollowActionType | UnFollowActionType | SetUsersActionType
type FollowActionType = ReturnType<typeof followAC>
type UnFollowActionType = ReturnType<typeof unfollowAC>
type SetUsersActionType = ReturnType<typeof setUsersAC>


let initialState = {
    users: [/*
        {id:1,followed: false, fullName:'Dmitriy', status:' I am a boss', location:{city:'Minsk',country:'Belarus'}},
        {id:2,followed: true, fullName:'Oleg', status:' I am a boss', location:{city:'Kiev',country:'Ukraine'}},
        {id:3,followed: false, fullName:'Ivan', status:' I am a boss', location:{city:'Moscow',country:'Russia'}},
   */ ] as UsersType []
}

export type InitialStateType = typeof initialState

export const usersReducer = (state: InitialStateType = initialState, action: DispatchType):InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users:state.users.map( u => {
                    if(u.id === action.userID){
                        return {...u, followed: true}
                    }
                        return u
                    })}

        case UNFOLLOW:
            return {
                ...state,
                users:state.users.map( u => {
                    if(u.id === action.userID){
                        return {...u, followed: false}
                    }
                    return u
                })}
        case SET_USERS:{
            return {...state, users: [...state.users, ...action.users] }
        }

        default:
            return state
    }
}


export const followAC = (id:number) => {
   return {
        type: FOLLOW, userID: id
    } as const
}

export const unfollowAC = (id:number) => {
    return {
        type: UNFOLLOW, userID: id
    }as const
}
export const setUsersAC = (users:[]) => {
    return {
        type: SET_USERS, users: users
    }as const
}