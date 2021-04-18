const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';


export type PostsType = {
    id: number
    messages: string
    likesCount: number
}
export type ProfilePageType = {
    posts: PostsType[]
    newPostText: string
    profile: ProfileType | null
}
//export type ProfileType = {profile:any}

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
export type ProfileType = {
        aboutMe: string
        contacts: ContactsType
        lookingForAJob: boolean
        lookingForAJobDescription: string
        fullName: string
        userId: number
        photos: {
            small: string
            large: string
        }
    }
export type DispatchType = AddPostActionType | UpdatePostActionType | SetUsersProfileActionType
type AddPostActionType = ReturnType<typeof addPostCreator>
type UpdatePostActionType = ReturnType<typeof updateNewPostCreator>
type SetUsersProfileActionType = ReturnType<typeof setUsersProfile>


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
    profile: null
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
                posts: [...state.posts, newPost],
                newPostText: ''
            }

        case UPDATE_NEW_POST:
            return {
                ...state,
                newPostText: action.newText
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
export const setUsersProfile = (profile: ProfileType) => {
    return {
        type: SET_USER_PROFILE, profile
    } as const
}