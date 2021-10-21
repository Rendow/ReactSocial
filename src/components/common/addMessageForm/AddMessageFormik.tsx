import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import s from "./AddMessageFormik.module.css";
import {FormControl, FormGroup} from "@material-ui/core";
import SuperButton from "../Button/SuperButton";
import React from "react";

type FormikErrorType = {
    text?: string
}
type AddMessageFormikType = {
    addPost?: (newPostText: string) => void
    placeholder?: string
    buttonWidth?: string
    textareaClass?: string
    style?: { width: string; margin: string; }
}

export const AddMessageFormik = (props: AddMessageFormikType) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            text: '',
        },
        onSubmit: (values, actions) => {
            dispatch(props.addPost && props.addPost(values.text))
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

    let textareaClass = props.textareaClass ? props.textareaClass + ' ' + s.textarea : s.textarea

    return <form onSubmit={formik.handleSubmit}>
        <FormControl style={{display: 'flex', flex: '1 0'}}>
            <FormGroup>
                            <textarea
                                className={textareaClass}
                                style={props.style}
                                placeholder={props.placeholder}
                                {...formik.getFieldProps('text')}
                            />

                {formik.touched.text && formik.errors.text
                    ? <div style={{color: 'red'}}>{formik.errors.text}</div>
                    : null}

                <SuperButton style={{width: props.buttonWidth}}
                    //  className={s.btn}
                             type={'submit'}> Send message</SuperButton>
            </FormGroup>
        </FormControl>
    </form>

}