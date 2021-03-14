import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from './Message/Message';
import {DialogsPageType} from '../../Redux/state';
import {sendMessageCreator, updateNewMessageCreator} from '../../Redux/dialogs-reducer';


type DialogType = {
    dialogsPage:DialogsPageType
    dispatch:(action:any) => void
}

function Dialogs(props:DialogType) {

    let dialogsElements = props.dialogsPage.dialogs.map (dialog =>  <DialogItem name={dialog.name} id={dialog.id}/> )
    let messagesElements = props.dialogsPage.messages.map ( message => <Message message={message.messages}/>)

    let newMessageBody = props.dialogsPage.newMessageBody
    let onChange =  (event: ChangeEvent<HTMLTextAreaElement>) => {
        let text = event.currentTarget.value
        let action = updateNewMessageCreator(text);
        props.dispatch(action)
    }

    let newPostElement = React.createRef<HTMLTextAreaElement>()
    let onClick = () => {
        props.dispatch(sendMessageCreator())
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>

                {dialogsElements}

            </div>
            <div className={s.messages}>
                {messagesElements}
                <div> <div>
                    <textarea
                        onChange={onChange}
                        value={newMessageBody}
                        ref={newPostElement}> </textarea>
                </div>
                    <div>
                        <button onClick={onClick}> Send message</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs











