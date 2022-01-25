import {profileAPI} from "../api/api";
import {FormType} from "../components/Profile/ProfileInfo/ContentForm/ContentForm";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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

export const getProfile = createAsyncThunk('profile/set-profile', async (id:number | null, thunkAPI) => {
    try {
        const res = await profileAPI.getProfile(id)
        thunkAPI.dispatch(setUsersProfile(res.data))
    }catch (e){
        console.log(e)
    }
})


export const getStatus = createAsyncThunk('profile/get-status', async (param:number, thunkAPI) => {
    try {
        const res = await profileAPI.getStatus(param)
        thunkAPI.dispatch(setStatus(res.data))
    } catch (e) {
        console.log(e)
    }
})


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
