import {DispatchType, PostsType, ProfilePageType} from "./store";

const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';

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

export const profileReducer = (state: ProfilePageType = initialState, action: DispatchType) => {

    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = {
                id: new Date().getTime(),
                messages: state.newPostText,
                likesCount: 0,
            }
            state.posts.push(newPost)
            state.newPostText = '';
            return state

        case UPDATE_NEW_POST:
            state.newPostText = action.newText;
            return state
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