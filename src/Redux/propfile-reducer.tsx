import {Dispatch} from "redux";
import {profileAPI, userAPI} from "../api/api";

const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';


export type PostsType = {
    id: number
    messages: string
    likesCount: number
}

export type ContactsType = {
    facebook: string
    website: null
    vk: string
    twitter: string
    instagram: string
    youtube: null
    github: string
    mainLink: null
}
export type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
        aboutMe: string
        contacts: ContactsType
        lookingForAJob: boolean
        lookingForAJobDescription: string
        fullName: string
        userId: number
        photos: PhotosType
    }
export type ProfilePageType = {
    posts: PostsType[]
    newPostText: string
    profile: ProfileType | null
    status: string

}

export type DispatchType = AddPostActionType | UpdatePostActionType | SetUsersProfileActionType | SetStatusActionType
type AddPostActionType = ReturnType<typeof addPostCreator>
type UpdatePostActionType = ReturnType<typeof updateNewPostCreator>
type SetUsersProfileActionType = ReturnType<typeof setUsersProfile>
type SetStatusActionType = ReturnType<typeof setStatus>


let initialState = {
    posts: [
        {
            id: 1,
            messages: 'Hi,how are you?',
            likesCount: 11,
        },
        {
            id: 2,
            messages: 'its my first posts',
            likesCount: 41,
        },

    ],
    newPostText: '',
    profile: null,
    status:'Hello!'
}

export const profileReducer = (state: ProfilePageType = initialState, action: DispatchType): ProfilePageType => {

    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = {
                id: new Date().getTime(),
                messages: state.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost],

            }

        case UPDATE_NEW_POST:
            return {
                ...state,
                newPostText: action.newText
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


export const addPostCreator = () => {
    return {
        type: ADD_POST
    } as const
}
export const updateNewPostCreator = (text: string) => {
    return {
        type: UPDATE_NEW_POST, newText: text
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
    return (dispatch: Dispatch<DispatchType>) => {
        userAPI.getProfile(id)
            .then(data => {
                    dispatch(setUsersProfile(data.data))
                }
            )}
}
export const getStatus = (id:number)  => {
    return (dispatch: Dispatch<DispatchType>) => {
        profileAPI.getStatus(id)
            .then(data => {
                    dispatch(setStatus(data.data))
                }
            )}
}
export const updateStatus = (text: string) => {
    return (dispatch: Dispatch<DispatchType>) => {
        profileAPI.updateStatus(text)
            .then(data => {
                    if (data.data.resultCode === 0) {
                        dispatch(setStatus(data.data))
                    }
                }
            )
    }
}