import {profileAPI} from "../api/api";
import {FormType} from "../components/Profile/ProfileInfo/ContentForm/ContentForm";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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

//export type ProfileActionType = AddPostActionType | ProfileUpdateModeType | SetUsersProfileActionType | SetStatusActionType | DeletePostActionType | SetPhotoActionType
//
// export type AddPostActionType = ReturnType<typeof addPostCreator>
// type SetUsersProfileActionType = ReturnType<typeof setUsersProfile>
// type SetStatusActionType = ReturnType<typeof setStatus>
// type DeletePostActionType = ReturnType<typeof deletePost>
// type SetPhotoActionType = ReturnType<typeof setPhotoSuccess>
// type ProfileUpdateModeType = ReturnType<typeof profileUpdateMode>
//

const initialState:ProfilePageType = {
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
    profile: null ,
    status:'Hello!',
    isOwner:false,
    updateMode:false
}

// export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionType): ProfilePageType => {
//
//     switch (action.type) {
//         case ADD_POST:
//             let newPost: PostsType = {
//                 id: new Date().getTime(),
//                 messages: action.newPostText,
//                 likesCount: Math.ceil(Math.random() * 100),
//             }
//             return {
//                 ...state,
//                 posts: [newPost,...state.posts],
//                 newPostText: '',
//             }
//
//         case SET_STATUS:
//             return {
//                 ...state,
//                 status: action.text
//             }
//         case SET_USER_PROFILE:
//             return {...state, profile: action.profile}
//
//         case DELETE_POST:
//             return {...state,
//                 posts: state.posts.filter((post) => post.id !== action.id) }
//         case SET_PHOTO:
//             return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
//       case 'PROFILE_UPDATE_MODE':
//             return {...state, updateMode:action.mode }
//
//
//         default:
//             return state
//     }
// }
export const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        addPostCreator(state,action) {
            const newPost: PostsType = {
                id: new Date().getTime(),
                messages: action.payload,
                likesCount: Math.ceil(Math.random() * 100),
            }

            state.newPostText = ''
            state.posts = [newPost,...state.posts]
        },
        setStatus(state,action) {
            state.status = action.payload
        },
        setUsersProfile(state,action) {
            state.profile = action.payload
        },
        deletePost(state,action) {
            state.posts = state.posts.filter((post) => post.id !== action.payload)
        },
        setPhotoSuccess(state,action) {
            if(state?.profile?.photos) state.profile.photos = action.payload
        },
        profileUpdateMode(state,action) {
            state.updateMode = action.payload
        },
    },
    extraReducers: (builder) => {

    }
})
export const {addPostCreator,setStatus,setUsersProfile,deletePost,setPhotoSuccess,profileUpdateMode} = slice.actions
export const profileReducer = slice.reducer

// export const addPostCreator = (newPostText:string) => ({type: ADD_POST, newPostText} as const)
// export const setStatus = (text: string) => ({type: SET_STATUS, text} as const)
// export const setUsersProfile = (profile: ProfileType) => ( {type: SET_USER_PROFILE, profile} as const)
// export const deletePost = (id: number) => ({type: DELETE_POST, id} as const)
// export const setPhotoSuccess = (photos: PhotosType) => ({type: SET_PHOTO, photos} as const )
// export const profileUpdateMode = (mode: boolean) => ({type: "PROFILE_UPDATE_MODE", mode} as const)
//
// export const getProfile = (id:number | null) =>
//     async (dispatch: Dispatch<ProfileActionType>) => {
//          try {
//              const res = await profileAPI.getProfile(id)
//              dispatch(setUsersProfile(res.data))
//          }catch (e){
//              console.log(e)
//          }
// }
export const getProfile = createAsyncThunk('profile/set-profile', async (id:number | null, thunkAPI) => {
    try {
        const res = await profileAPI.getProfile(id)
        thunkAPI.dispatch(setUsersProfile(res.data))
    }catch (e){
        console.log(e)
    }
})


// export const getStatus = (id: number) =>
//     async (dispatch: Dispatch<ProfileActionType>) => {
//         try {
//             const res = await profileAPI.getStatus(id)
//             dispatch(setStatus(res.data))
//         } catch (e) {
//             console.log(e)
//         }
//     }
export const getStatus = createAsyncThunk('profile/get-status', async (param:number, thunkAPI) => {
    try {
        const res = await profileAPI.getStatus(param)
        thunkAPI.dispatch(setStatus(res.data))
    } catch (e) {
        console.log(e)
    }
})



// export const setPhoto = (file: string | Blob) =>
//     async (dispatch: Dispatch<ProfileActionType>) => {
//         try {
//             const res = await profileAPI.setPhoto(file)
//             if (res.data.resultCode === 0) {
//                 dispatch(setPhotoSuccess(res.data.data.photos))
//             }
//         } catch (e) {
//             console.log(e)
//         }
//     }
export const setPhoto = createAsyncThunk('profile/set-photo', async (param:string | Blob, thunkAPI) => {
    try {
        const res = await profileAPI.setPhoto(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setPhotoSuccess(res.data.data.photos))
        }
    } catch (e) {
        console.log(e)
    }
})

// export const setProfile = (file: FormType):AppThunkType  =>
//     async (dispatch, getState) => {
//         let userId = getState().auth.userId
//         try {
//             const res = await profileAPI.setProfile(file)
//                     if (res.data.resultCode === 0) {
//                         dispatch(getProfile(userId))
//                         dispatch(profileUpdateMode(false))
//                     }
//         } catch (e) {
//           return Promise.reject(e.data.messages[0])
//         }
//     }
export const setProfile = createAsyncThunk('profile/set-profile', async (param:FormType, thunkAPI) => {
    // @ts-ignore
    const userId = thunkAPI.getState().auth.userId
    try {
        const res = await profileAPI.setProfile(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(getProfile(userId))
            thunkAPI.dispatch(profileUpdateMode(false))
        }
    } catch (e) {
        return Promise.reject(e.data.messages[0])
    }
})

// export const updateStatus = (text: string) =>
//     async (dispatch: Dispatch<ProfileActionType>) => {
//         try {
//             const res = await profileAPI.updateStatus(text)
//             if (res.data.resultCode === 0) {
//                 dispatch(setStatus(text))
//             }
//         } catch (e) {
//             console.log(e)
//         }
//     }
export const updateStatus = createAsyncThunk('profile/update-status', async (param:string, thunkAPI) => {
    try {
        const res = await profileAPI.updateStatus(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatus(param))
        }
    } catch (e) {
        console.log(e)
    }
})
