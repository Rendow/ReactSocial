import React, {useEffect, useState} from 'react';
import s from './Chat.module.css'
import SuperButton from "../common/Button/SuperButton";
import {Avatar} from "@material-ui/core";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

 export type ChatMessageType = {
     message: string
     photo: string
     userId: number
     userName: string
 }

 function ChatPage  () {

    useEffect(() => {
        document.title = 'Chat'
    },[])


    return (
        <div className={s.chatWrap}>
        <Messages/>
        <AddMessageForm/>
        </div>
    )
}



 function Messages() {
     const [messages,setMessages] = useState<ChatMessageType[]>([])

     useEffect(() => {
         ws.addEventListener('message', (e) => {
             let newMessage = JSON.parse(e.data)
             setMessages((prevMessages) => [...prevMessages, ...newMessage])
         })
     },[])


     return (
         <div className={s.messages}>
             {messages.map((m, index) => <Message
                 key={m.userId + index} message={m.message} userId={m.userId}
                 userName={m.userName} photo={m.photo}/>)}
         </div>
     )
 }


 function Message(props:ChatMessageType) {

     return (
         <div className={s.message}>
             <div className={s.messageInfo}>
                 <Avatar src={props.photo}/>
                 <p> {props.userName}</p>
             </div>
             <p> {props.message}</p>
         </div>
     );
 }

 function AddMessageForm() {
    const [message,setMessage] = useState('')

     const sendMessage = () => {
        if(!message) return;

         ws.send(message)
         setMessage('')
     }

     return <>
         <textarea value={message} onChange = {(e)=>{setMessage(e.currentTarget.value)} }/>
         <SuperButton onClick={sendMessage}>Send </SuperButton>
     </> ;
 }

export default ChatPage