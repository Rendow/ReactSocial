import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {FormType} from "../components/Profile/ProfileInfo/ContentForm/ContentForm";
import {AppThunkType} from "./redux-store";

const ADD_POST = 'PROFILE/ADD-POST';
const SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE';
const SET_STATUS = 'PROFILE/SET_STATUS';
const DELETE_POST = 'PROFILE/DELETE_POST';
const SET_PHOTO = 'PROFILE/SET_PHOTO';


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
    userId: number| null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string | null
    aboutMe: string | null
    contacts: ContactsType
    photos: PhotosType
    }
export type ProfilePageType = {
    posts: PostsType[]
    newPostText: string
    profile: ProfileType | null
    status: string
    isOwner:boolean
    updateMode:boolean
}

export type ProfileActionType = AddPostActionType | ProfileUpdateModeType | SetUsersProfileActionType | SetStatusActionType | DeletePostActionType | SetPhotoActionType

type AddPostActionType = ReturnType<typeof addPostCreator>
type SetUsersProfileActionType = ReturnType<typeof setUsersProfile>
type SetStatusActionType = ReturnType<typeof setStatus>
type DeletePostActionType = ReturnType<typeof deletePost>
type SetPhotoActionType = ReturnType<typeof setPhotoSuccess>
type ProfileUpdateModeType = ReturnType<typeof profileUpdateMode>


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
    status:'Hello!',
    isOwner:false,
    updateMode:false
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
                posts: [newPost,...state.posts],

            }

        case SET_STATUS:
            return {
                ...state,
                status: action.text
            }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}

        case DELETE_POST:
            return {...state,
                posts: state.posts.filter((post) => post.id !== action.id) }
        case SET_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
      case 'PROFILE_UPDATE_MODE':
            return {...state, updateMode:action.mode }


        default:
            return state
    }
}


export const addPostCreator = (newPostText:string) => ({type: ADD_POST, newPostText} as const)
export const setStatus = (text: string) => ({type: SET_STATUS, text} as const)
export const setUsersProfile = (profile: ProfileType) => ( {type: SET_USER_PROFILE, profile} as const)
export const deletePost = (id: number) => ({type: DELETE_POST, id} as const)
export const setPhotoSuccess = (photos: PhotosType) => ({type: SET_PHOTO, photos} as const )
export const profileUpdateMode = (mode: boolean) => ({type: "PROFILE_UPDATE_MODE", mode} as const)

export const getProfile = (id:number | null) => {
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
export const setPhoto = (file:string | Blob)  => {
    return (dispatch: Dispatch<ProfileActionType>) => {

        profileAPI.setPhoto(file)
            .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(setPhotoSuccess(data.data.data.photos))
                }}
            )}
}

export const setProfile = (file: FormType):AppThunkType  =>
    async (dispatch, getState) => {
        let userId = getState().auth.userId
        try {
            const data = await profileAPI.setProfile(file)
                    if (data.data.resultCode === 0) {
                        dispatch(getProfile(userId))
                        dispatch(profileUpdateMode(false))
                    }
        } catch (e) {
          return Promise.reject(e.data.messages[0])
        }
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