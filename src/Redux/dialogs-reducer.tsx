import {DialogsPageType, DispatchType} from "./store";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
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
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: DispatchType) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state

        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.messages.push({id: new Date().getTime(), messages: body});
            state.newMessageBody = ''
            return state
        default:
            return state
    }
}


export const sendMessageCreator = () => {
   return {
        type: SEND_MESSAGE
    } as const
}
export const updateNewMessageCreator = (text: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY, body: text
    } as const
}