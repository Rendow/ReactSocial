import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from './Message/Message';
import {DialogsMapDispatchToPropsType, DialogsMapStateToPropsType} from "./DialogsContainer";
import {Button, TextField} from "@material-ui/core";
import {ChangeEvent} from "react";
import React from 'react';
import {Field, reduxForm, InjectedFormProps, SubmitHandler, FormSubmitHandler} from "redux-form";
import {FormDataType} from "../Login/Login";


export type DialogType = DialogsMapStateToPropsType & DialogsMapDispatchToPropsType

function Dialogs(props: DialogType) {

    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>)
    let messagesElements = props.dialogsPage.messages.map(message => <Message key={message.id} message={message.messages}/>)
    // let newPostElement = React.createRef<HTMLDivElement>()
    //
    // let newMessageBody = props.dialogsPage.newMessageBody
    //
    // let updateNewMessageBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
    //     let text = event.currentTarget.value
    //     props.updateNewMessageBody(text)
    // }
    // let sendMessage = () => {
    //     props.sendMessage()
    // }

    let sendMessage = (text:any) => {
        props.sendMessage(text.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <AddMessageFormRedux onSubmit={sendMessage}/>
                    {/*<div>*/}
                    {/*    <TextField*/}
                    {/*        variant={"outlined"}*/}
                    {/*        color={"primary"}*/}
                    {/*        style={{margin: '10px 0'}}*/}
                    {/*        onChange={updateNewMessageBody}*/}
                    {/*        value={newMessageBody}*/}
                    {/*        ref={newPostElement}> </TextField>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <Button*/}
                    {/*        color={"primary"}*/}
                    {/*        variant={"contained"}*/}
                    {/*        style={{margin:'5px 0'}}*/}
                    {/*        disabled={newMessageBody === ''}*/}
                    {/*        onClick={sendMessage}> Send message*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </div>
            </div>

        </div>
    )
}


const AddMessageForm = (props:InjectedFormProps<FormDataType> ) => {

    return  <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Enter your message'}
                       name={'newMessageBody'} component={'textarea'}/>
            </div>
            <button
                style={{margin:'5px 0'}}>
                Send message
            </button>
        </form>
    </div>
}
export const AddMessageFormRedux = reduxForm<FormDataType >({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs











