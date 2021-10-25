import {StatusType} from "../redux/chat-reducer";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type MessageReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void


let subscribers = {
    'message-received': [] as MessageReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null
type EventsNamesType = 'message-received' | 'status-changed'

//в removeEventListener нужно передавать ту же функци, что и в addEventListener - поэтому выносим в отдельную переменную
const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

function createChannel() {
    cleanUp()
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)

}

const messageHandler = (e: MessageEvent) => {
    let newMessage = JSON.parse(e.data)
    subscribers["message-received"].forEach(s => s(newMessage))
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
}
export const ChatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["message-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
}