import {PostsType } from "./state";

const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';

export const profileReducer = (state: any, action: any) => {

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