import React, {MutableRefObject, RefObject, useEffect, useRef, useState} from 'react';
import s from './Chat.module.css'
import SuperButton from "../common/Button/SuperButton";
import {Avatar} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import logo from "../Users/img/logo2.png";
import {compose} from "redux";
import {connect, useDispatch, useSelector} from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import Dialogs from "../Dialogs/Dialogs";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {ReduxStateType} from "../../redux/redux-store";


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type WsChannelType = {
    wsChannel: WebSocket | null
}

function ChatPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    useEffect(() => {
        document.title = 'Chat'
    }, [])


    return (
        <div className={s.chatWrap}>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}


function Messages() {
    const messages = useSelector((state: ReduxStateType) => state.chat.messages)

    let ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        //авто скролл вниз
        if (ref && ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    }, [messages])


    return (
        <div ref={ref} className={s.messages}>
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
                 <NavLink to={'/profile/' + props.userId}>
                     <Avatar src={props.photo}/>
                 </NavLink>
                 <p> {message}</p>
             </div>

         </div>
     );
 }

function AddMessageForm() {
    const messages = useSelector((state: ReduxStateType) => state.chat.messages)
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const sendMessageHandler = () => {
        if (!message) return;

        dispatch(sendMessage(message))
        setMessage('')
    }

    const sendMessageByKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!message) return;

        if (e?.key === 'Enter') {
            dispatch(sendMessage(message))
            setMessage('')
        }
    }

    return <div className={s.formGroup}>
        <textarea onKeyPress={sendMessageByKey} placeholder={'Enter your message'} className={s.textarea}
                  value={message} onChange={(e) => {
            setMessage(e.currentTarget.value)
        }}/>
        <SuperButton style={{marginRight: '40px'}}
            //disabled={readyStatus !== 'ready'}
                     onClick={sendMessageHandler}>Send </SuperButton>
    </div>;
}


export default compose<React.ComponentType>(WithAuthRedirect)(ChatPage)
