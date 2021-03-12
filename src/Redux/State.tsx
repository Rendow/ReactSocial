
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
    img: string
}

export type DialogsPageType ={
    dialogs: DialogsType[]
    messages: MessagesType[]
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
    _callSubscrider: () => void
    getState:() => StateType
    dispatch:(action:any) => void
}
const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
let store:StoreType = {
    _state: {
        profilePage: {
            posts: [
                {
                    id: 1,
                    messages: 'Hi,how are you?',
                    likesCount: 11,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Spb_metro_logo.svg/1280px-Spb_metro_logo.svg.png'
                },
                {
                    id: 2,
                    messages: 'its my first posts',
                    likesCount: 41,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png'
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
        },
    },
     _callSubscrider ()  {
        console.log('State changed')
    },

     subscribe (observer:any) {
        this._callSubscrider = observer
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
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png'
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscrider()
        } else if(action.type === UPDATE_NEW_POST){
            this._state.profilePage.newPostText = action.newText
            this._callSubscrider()
        }
    },
}



export const addPostActionCreator = () => ({type: ADD_POST});

export const updateNewPostActionCreator = (text: string) =>
    ({type: UPDATE_NEW_POST, newText: text});


export default  store

