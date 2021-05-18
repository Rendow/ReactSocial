import {Dispatch} from "redux";
import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';


export type PostsType = {
    id: number
    messages: string
    likesCount: number
}

export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    aboutMe: string | null
    contacts: ContactsType
    photos: PhotosType
    }
export type ProfilePageType = {
    posts: PostsType[]
    newPostText: string
    profile: ProfileType | null
    status: string

}

export type ProfileActionType = AddPostActionType  | SetUsersProfileActionType | SetStatusActionType

type AddPostActionType = ReturnType<typeof addPostCreator>
type SetUsersProfileActionType = ReturnType<typeof setUsersProfile>
type SetStatusActionType = ReturnType<typeof setStatus>


let initialState = {
    posts: [
        {
            id: 1,
            messages: 'Falcon 9’s first stage has landed on!',
            likesCount: 11,
        },
        {
            id: 2,
            messages: 'Yuri Gagarin was the first person to fly in space.',
            likesCount: 41,
        },

    ],
    newPostText: '',
    profile: null,
    status:'Hello!'
}

export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionType): ProfilePageType => {

    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = {
                id: new Date().getTime(),
                messages: action.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost],

            }

        case SET_STATUS:
            return {
                ...state,
                status: action.text
            }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}


        default:
            return state
    }
}


export const addPostCreator = (newPostText:any) => {
    return {
        type: ADD_POST, newPostText
    } as const
}

export const setStatus = (text: string) => {
    return {
        type: SET_STATUS, text
    } as const
}
export const setUsersProfile = (profile: ProfileType) => {
    return {
        type: SET_USER_PROFILE, profile
    } as const
}

export const getProfile = (id:number) => {
    return (dispatch: Dispatch<ProfileActionType>) => {
        profileAPI.getProfile(id)
            .then(data => {
                    dispatch(setUsersProfile(data.data))
                }
            )}
}
export const getStatus = (id:number)  => {
    return (dispatch: Dispatch<ProfileActionType>) => {
        profileAPI.getStatus(id)
            .then(data => {
                    dispatch(setStatus(data.data))
                }
            )}
}
export const updateStatus = (text: string) => {
    return (dispatch: Dispatch<ProfileActionType>) => {
        profileAPI.updateStatus(text)
            .then(data => {
                    if (data.data.resultCode === 0) {
                        dispatch(setStatus(text))
                    }
                }
            )
    }
}