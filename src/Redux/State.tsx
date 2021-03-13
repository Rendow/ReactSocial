
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
}
export type StoreType = {
    _state: StateType
    subscribe:(observer:any) => void
    _callSubscriber: () => void
    getState:() => StateType
    dispatch:(action:any) => void
}
const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'
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
    },
     _callSubscriber ()  {
        console.log('State changed')
    },

     subscribe (observer:any) {
        this._callSubscriber = observer
    },
    getState(){
        return this._state
    },
    dispatch(action: any) {
        if (action.type === ADD_POST) {
            let newPost:PostsType = {
                id:new Date().getTime(),
                messages:this._state.profilePage.newPostText,
                likesCount: 0,
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber()
        } else if(action.type === UPDATE_NEW_POST){
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber()
        }else if(action.type === UPDATE_NEW_MESSAGE_BODY){
            this._state.dialogsPage.newMessageBody = action.body
            this._callSubscriber()
        }else if(action.type === SEND_MESSAGE){
            let body = this._state.dialogsPage.newMessageBody
            this._state.dialogsPage.messages.push({id: new Date().getTime(), messages: body});
            this._state.dialogsPage.newMessageBody = ''
            this._callSubscriber()

        }
    },
}



export const addPostCreator = () => ({type: ADD_POST});
export const updateNewPostCreator = (text: string) =>
    ({type: UPDATE_NEW_POST, newText: text});

export const sendMessageCreator = () => ({type: SEND_MESSAGE});
export const updateNewMessageCreator = (text: string) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: text});


export default  store

