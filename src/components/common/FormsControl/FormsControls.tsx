import React from 'react'
import s from './FormsControls.module.css'
import {WrappedFieldsProps} from 'redux-form/lib/Fields'
import { FieldProps } from 'formik'


export const Textarea: React.FC<WrappedFieldsProps> = ({input,meta, value, ...restProps}) => {
    const classStyle = meta.touched && meta.error ? s.errorTextarea + ' ' + s.textarea :  s.textarea
    return <div>
        <textarea className={classStyle} {...restProps} {...value}{...input} {...meta}/>
        <div>
            {meta.touched && meta.error && <span className={s.errorSpan}> {meta.error}</span>}
        </div>

    </div>
}

export const Input: React.FC<WrappedFieldsProps> = ({input,meta, ...restProps}) => {
    const classStyle = meta.touched && meta.error ? s.errorTextarea + ' ' + s.textarea :  s.textarea
    return <div>
        <input className={classStyle} {...restProps} {...input} {...meta}/>
        <div>
            {meta.touched && meta.error && <span className={s.errorSpan}> {meta.error}</span>}
        </div>
    </div>
}
export const FormInput:  React.ComponentType<FieldProps> = ({ field,  form: { touched, errors }, ...props }) => {
    const classStyle = touched[field.name] && errors[field.name] ? s.errorTextarea + ' ' + s.textarea + ' ' + s.formClass  :  s.textarea + ' ' + s.formClass
    return <div>
        <input className={classStyle}
               {...field} {...props}/>
        <div>
            {touched[field.name] && errors[field.name] && <span className={s.errorSpan}> {errors[field.name]}</span>}
        </div>
    </div>
}
export const FormSelect:  React.ComponentType<FieldProps> = ({children, field,  form: { touched, errors }, ...props }) => {
    const classStyle = touched[field.name] && errors[field.name] ? s.errorTextarea + ' ' + s.textarea + ' ' + s.formClass :  s.textarea + ' ' + s.formClass
    return <div>
        <select className={classStyle}
               {...field} {...props}>
            {children}
        </select>
        <div>
            {touched[field.name] && errors[field.name] && <span className={s.errorSpan}> {errors[field.name]}</span>}
        </div>
    </div>
}
