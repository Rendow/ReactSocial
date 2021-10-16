import React, {useEffect, useState} from 'react';
import s from './Chat.module.css'
import SuperButton from "../common/Button/SuperButton";
import {Avatar} from "@material-ui/core";


type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type WsChannelType = {
    wsChannel: WebSocket | null
}

function ChatPage() {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        console.log('chat page')
        let ws: WebSocket

        const closeHandler = () => {
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }

        createChannel()

        return () => {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
        }

    }, [])

    useEffect(() => {
        document.title = 'Chat'
    }, [])


    return (
        <div className={s.chatWrap}>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}


function Messages({wsChannel}: WsChannelType) {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        console.log('Messages ')
        const messageHandler = (e: MessageEvent) => {
            let newMessage = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessage])
        }
        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }

    }, [wsChannel])


     return (
         <div className={s.messages}>
             {messages.map((m, index) => <Message
                 key={index} message={m.message} userId={m.userId}
                 userName={m.userName} photo={m.photo}/>)}
         </div>
     )
 }


 function Message(props:ChatMessageType) {

     let message = props.message.charAt(0).toUpperCase() + props.message.slice(1)

     return (
         <div className={s.messageWrap}>
             <div className={s.messageInfo}>
                 <p style={{flex: '1'}}> {props.userName}</p>
                 <p> {new Date().toLocaleDateString()}</p>
             </div>

             <div className={s.message}>
                 <div>
                     <Avatar src={props.photo}/>
                 </div>
                 <p> {message}</p>
             </div>

         </div>
     );
 }

function AddMessageForm({wsChannel}: WsChannelType) {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        console.log('AddMessageForm ')

        const openHandler = () => {
            setReadyStatus('ready')
        }

        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }

    }, [wsChannel])

    const sendMessage = () => {
        if (!message) return;

        wsChannel?.send(message)
        setMessage('')
    }

    const sendMessageByKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!message) return;

        if (e?.key === 'Enter') {
            wsChannel?.send(message)
            setMessage('')
        }

    }

    return <div className={s.formGroup}>
        <textarea onKeyPress={sendMessageByKey} placeholder={'Enter your message'} className={s.textarea}
                  value={message} onChange={(e) => {
            setMessage(e.currentTarget.value)
        }}/>
        <SuperButton style={{marginRight: '40px'}} disabled={readyStatus !== 'ready'}
                     onClick={sendMessage}>Send </SuperButton>
    </div>;
}

export default ChatPage

