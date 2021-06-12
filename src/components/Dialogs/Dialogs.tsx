import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from './Message/Message';
import {DialogsMapDispatchToPropsType, DialogsMapStateToPropsType} from "./DialogsContainer";
import React, {useEffect, useState} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FormDataType} from "../Login/Login";
import {Textarea} from "../common/FormsControl/FormsControls";
import {maxLenghtCreator, minLenghtCreator, required} from "../../utils/validators/validators";
import SuperButton from "../common/FormsControl/SuperButton";


export type DialogType = DialogsMapStateToPropsType & DialogsMapDispatchToPropsType

function Dialogs(props: DialogType) {
    useEffect(() => {
        document.title = 'Messages'
    },[])



    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>)
    let messagesElements = props.dialogsPage.messages.map(message => <Message key={message.id} message={message.messages}/>)


    let sendMessage = (text:any) => {
        props.sendMessage(text.newMessageBody)
        console.log(text)
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
                </div>
            </div>

        </div>
    )
}

let maxLength = maxLenghtCreator(40)
let minLength = minLenghtCreator(4)

const AddMessageForm = (props: InjectedFormProps<FormDataType> ) => {
    const [text,setText] = useState('asD12')

    return  <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    value={text}
                    onChange={(e: any) => {setText(e?.currentTarget.value)}}
                    placeholder={'Enter your message'}
                    style={{margin: '10px 0'}}
                    validate={[required, maxLength, minLength]}
                    name={'newMessageBody'} component={Textarea}/>
            </div>
            <SuperButton
                onClick={()=>{setText('')}}
                style={{width:'120px'}}>
                Send message
            </SuperButton>
        </form>
    </div>
}
export const AddMessageFormRedux = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs











