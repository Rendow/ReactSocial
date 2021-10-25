export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type SubscriberType = (messages: ChatMessageType[]) => void


let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null

//в removeEventListener нужно передавать ту же функци, что и в addEventListener - поэтому выносим в отдельную переменную
const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)

}

const messageHandler = (e: MessageEvent) => {
    let newMessage = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessage))
}

export const ChatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
}