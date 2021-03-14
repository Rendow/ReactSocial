const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

export const dialogsReducer = (state: any, action: any) => {

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