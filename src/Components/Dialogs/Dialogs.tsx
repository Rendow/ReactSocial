import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from './Message/Message';
import { DialogsPageType } from '../../Redux/State';


type DialogType = {
    dialogsPage:DialogsPageType
}

function Dialogs(props:DialogType) {

    let dialogsElements = props.dialogsPage.dialogs.map (dialog =>  <DialogItem name={dialog.name} id={dialog.id}/> )
    let messagesElements = props.dialogsPage.messages.map ( message => <Message message={message.messages}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>()
    let addPost = () =>  newPostElement.current ? alert(newPostElement.current.value) : ''

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>

                {dialogsElements}

            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <textarea  ref={newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={addPost}> Add post</button>
                </div>
            </div>

        </div>
    )
}

export default Dialogs











