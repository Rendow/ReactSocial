const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';


export type PostsType = {
    id: number
    messages: string
    likesCount: number
}
export type ProfilePageType = {
    posts: PostsType[]
    newPostText: string
}
export type DispatchType = AddPostActionType | UpdatePostActionType
type AddPostActionType = ReturnType<typeof addPostCreator>
type UpdatePostActionType = ReturnType<typeof updateNewPostCreator>


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
    newPostText:''
}

export const profileReducer = (state: ProfilePageType = initialState, action: DispatchType):ProfilePageType => {

    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = {
                id: new Date().getTime(),
                messages: state.newPostText,
                likesCount: 0,
            }

            return {...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }

        case UPDATE_NEW_POST:
            return {...state,
                newPostText: action.newText
            }

        default:
            return state
    }
}


export const addPostCreator = () => {
   return {
        type: ADD_POST
    } as const
}
export const updateNewPostCreator = (text: string)=> {
    return {
        type: UPDATE_NEW_POST, newText: text
    }as const
}