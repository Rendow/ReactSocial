import React from 'react'
import s from './FormsControls.module.css'
import {WrappedFieldsProps} from 'redux-form/lib/Fields'


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