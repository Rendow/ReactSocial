
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'


export type MessagesType = {
    id: number
    messages: string
}

export type DialogsType = {
    id: number
    name: string
}
export type DispatchType = SendMessageActionType
    //| UpdateNewMessageBodyActionType

type UpdateNewMessageBodyActionType = ReturnType<typeof updateNewMessageCreator>
type SendMessageActionType = ReturnType<typeof sendMessageCreator>


let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Anya'},
        {id: 4, name: 'Sveta'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'},
    ] as DialogsType[],
    messages: [
        {id: 1, messages: 'Hi'},
        {id: 2, messages: 'How are you?'},
        {id: 3, messages: 'Good'},
    ] as MessagesType[]
}
export type InitialStateType = typeof initialState

export const dialogsReducer = (state: InitialStateType = initialState, action: DispatchType):InitialStateType => {

    switch (action.type) {
        // case UPDATE_NEW_MESSAGE_BODY:
        //
        //     return {...state,
        //         newMessageBody: action.body}

        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {...state,
                messages:[...state.messages,{id: new Date().getTime(), messages: body}]}

        default:
            return state
    }
}


export const sendMessageCreator = (newMessageBody:any) => {
   return {
        type: SEND_MESSAGE, newMessageBody
    } as const
}
export const updateNewMessageCreator = (text: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY, body: text
    } as const
}