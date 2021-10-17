import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from './Message/Message';
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {ReduxStateType} from "../../redux/redux-store";
import {sendMessageCreator} from "../../redux/dialogs-reducer";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {AddMessageFormik} from "../common/addMessageForm/AddMessageFormik";


function Dialogs() {

    useEffect(() => {
        document.title = 'Messages'
    }, [])

    const dialogsPage = useSelector((state: ReduxStateType) => state.dialogsPage)

    let dialogsElements = dialogsPage.dialogs.map(dialog => <DialogItem key={dialog.id} name={dialog.name}
                                                                        id={dialog.id}/>)
    let messagesElements = dialogsPage.messages.map(message => <Message key={message.id} message={message.messages}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <AddMessageFormik buttonWidth={'155px'} placeholder={'Enter your message'}
                                      addPost={sendMessageCreator}/>
                </div>
            </div>
        </div>
    )
}



export default compose<React.ComponentType>(WithAuthRedirect)(Dialogs)











