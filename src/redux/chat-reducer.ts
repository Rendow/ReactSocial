import {authAPI, ResultCode} from "../api/api";
import {AppThunkType} from "./redux-store";
import {ChatMessageType} from "../components/Chat/ChatPage";
import {ChatApi} from "../api/chat-api";
import {Dispatch} from "redux";

export type ChatActionType = ReturnType<typeof messagesReceived>

let initialState = {
    messages: [] as ChatMessageType[]
}


export const chatReducer = (state = initialState, action: ChatActionType) => {

    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }

        default:
            return state
    }
}

const messagesReceived = (messages: ChatMessageType[]) => ({type: 'CHAT/MESSAGES_RECEIVED', payload: messages} as const)

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

        await ChatApi.subscribe(newMessageHandlerCreator(dispatch));
    }

export const stopMessagesListening = (): AppThunkType =>
    async (dispatch) => {

        await ChatApi.unsubscribe(newMessageHandlerCreator(dispatch));
    }
