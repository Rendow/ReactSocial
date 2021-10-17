import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from './Message/Message';
import React, {useEffect} from "react";
import SuperButton from "../common/Button/SuperButton";
import {FormControl, FormGroup} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {ReduxStateType} from "../../redux/redux-store";
import {sendMessageCreator} from "../../redux/dialogs-reducer";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


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
                    <AddMessageFormik/>
                </div>
            </div>
        </div>
    )
}

type FormikErrorType = {
    text?: string
}
const AddMessageFormik = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            text: '',
        },
        onSubmit: (values, actions) => {
            dispatch(sendMessageCreator(values.text))
            actions.setFieldValue('text', '', false)
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.text.length < 2) {
                errors.text = 'Message must be more than 2 characters'
            }
            return errors
        },
    })


    return <form onSubmit={formik.handleSubmit}>
        <FormControl style={{display: 'flex', flex: '1 0'}}>
            <FormGroup>
                            <textarea
                                className={s.textarea}
                                placeholder={'Enter your message'}
                                {...formik.getFieldProps('text')}
                            />

                {formik.touched.text && formik.errors.text
                    ? <div style={{color: 'red'}}>{formik.errors.text}</div>
                    : null}

                <SuperButton style={{width: '155px'}} type={'submit'}> Send message</SuperButton>
            </FormGroup>
        </FormControl>
    </form>

}

export default compose<React.ComponentType>(WithAuthRedirect)(Dialogs)











