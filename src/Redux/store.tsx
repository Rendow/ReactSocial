import {addPostCreator, profileReducer, updateNewPostCreator} from "./propfile-reducer";
import {dialogsReducer, sendMessageCreator, updateNewMessageCreator} from "./dialogs-reducer";
import { sidebarReducer } from "./sidebar-reducer";

export type MessagesType = {
    id: number
    messages: string
}

export type DialogsType = {
    id: number
    name: string
}

export type PostsType ={
    id: number
    messages: string
    likesCount: number
}

export type DialogsPageType ={
    dialogs: DialogsType[]
    messages: MessagesType[]
    newMessageBody:string
}

export type ProfilePageType ={
    posts: PostsType[]
    newPostText: string
}
export type StateType ={
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar:any
}
export type StoreType = {
    _state: StateType
    subscribe:(observer:() => void) => void
    _callSubscriber: () => void
    getState:() => StateType
    dispatch:(action:DispatchType) => void
}
export type DispatchType = AddPostActionType | UpdatePostActionType | UpdateNewMessageBodyActionType | SendMessageActionType


 type AddPostActionType = ReturnType<typeof addPostCreator>
 type UpdatePostActionType = ReturnType<typeof updateNewPostCreator>
 type UpdateNewMessageBodyActionType = ReturnType<typeof updateNewMessageCreator>
 type SendMessageActionType = ReturnType<typeof sendMessageCreator>

let store:StoreType = {
    _state: {
        profilePage: {
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

        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Anya'},
                {id: 4, name: 'Sveta'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Valera'},
            ],
            messages: [
                {id: 1, messages: 'Hi'},
                {id: 2, messages: 'How are you?'},
                {id: 3, messages: 'Good'},
            ],
            newMessageBody:''
        },
        sidebar:{}
    },
     _callSubscriber ()  {
        console.log('State changed')
    },
     subscribe (observer:() => void) {
        this._callSubscriber = observer
    },
     getState(){
        return this._state
    },
     dispatch(action: DispatchType) {

        this._state.profilePage = profileReducer(this._state.profilePage,action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage,action)
        this._state.sidebar = sidebarReducer(this._state.sidebar,action)

        this._callSubscriber()
    },
}




export default  store

