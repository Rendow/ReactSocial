import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from './Message/Message';
import {DialogsMapDispatchToPropsType, DialogsMapStateToPropsType} from "./DialogsContainer";


export type DialogType = DialogsMapStateToPropsType & DialogsMapDispatchToPropsType

function Dialogs(props: DialogType) {

    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>)
    let messagesElements = props.dialogsPage.messages.map(message => <Message key={message.id} message={message.messages}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>()

    let newMessageBody = props.dialogsPage.newMessageBody

    let updateNewMessageBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let text = event.currentTarget.value
        props.updateNewMessageBody(text)
    }
    let sendMessage = () => {
        props.sendMessage()
        debugger
    }

   //  if(!props.auth){ return <Redirect to={'/login'}/> }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <div>
                    <textarea
                        onChange={updateNewMessageBody}
                        value={newMessageBody}
                        ref={newPostElement}> </textarea>
                    </div>
                    <div>
                        <button disabled={newMessageBody === ''} onClick={sendMessage}> Send message</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs











