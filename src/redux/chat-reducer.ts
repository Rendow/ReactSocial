import {AppThunkType} from "./redux-store";
import {ChatMessageType} from "../components/Chat/ChatPage";
import {ChatApi} from "../api/chat-api";
import {Dispatch} from "redux";

export type ChatActionType = ReturnType<typeof messagesReceived> | ReturnType<typeof statusChanged>

export type StatusType = 'pending' | 'ready';
let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}


export const chatReducer = (state = initialState, action: ChatActionType) => {

    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }
        case 'CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload
            }

        default:
            return state
    }
}

const messagesReceived = (messages: ChatMessageType[]) => ({type: 'CHAT/MESSAGES_RECEIVED', payload: messages} as const)
const statusChanged = (status: StatusType) => ({type: 'CHAT/STATUS_CHANGED', payload: status} as const)

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

let newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): AppThunkType =>
    async (dispatch) => {

        ChatApi.start()
        ChatApi.subscribe('message-received', newMessageHandlerCreator(dispatch));
        ChatApi.subscribe('status-changed', newMessageHandlerCreator(dispatch));
    }

export const stopMessagesListening = (): AppThunkType =>
    async (dispatch) => {

        ChatApi.unsubscribe('message-received', newMessageHandlerCreator(dispatch));
        ChatApi.unsubscribe('status-changed', newMessageHandlerCreator(dispatch));
        ChatApi.stop()
    }

export const sendMessage = (message: string): AppThunkType =>
    async (dispatch) => {

        ChatApi.sendMessage(message)
    }
