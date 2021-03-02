let renderTree = (state: any) => {
    console.log('State changed')
}

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

let state : StateType = {
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
        newPostText:'some text'

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

}

export let addPost = () => {
    let newPost:PostsType = {
        id:new Date().getTime(),
        messages:state.profilePage.newPostText,
        likesCount: 0,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png'
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    renderTree(state)
}
export let updateNewPostText = (newText:string) => {
    state.profilePage.newPostText = newText
    renderTree(state)
}

export const subscribe = (observer:any) => {
    renderTree = observer
}

export default  state
