import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperCheckbox.module.css'
import {WrappedFieldsProps} from "redux-form/lib/Fields";
import {FieldProps} from "formik";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const SuperCheckbox: React.FC<SuperCheckboxPropsType & WrappedFieldsProps & FieldProps> = (
    {input,meta,type,checked,field,
        onChange, onChangeChecked,
        className, spanClassName,form,
        children,name,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    const finalInputClassName = `${s.checkbox} ${className ? className : ''}`

    return (
        <label className={s.label}>
            <input
                type={'checkbox'}
                className={finalInputClassName}
                checked={checked}
                {...input}
                {...field}
                {...meta}
                {...restProps}
            />
            {children && <span className={s.spanClassName}> {children}</span>}
        </label>
    )
}

export default SuperCheckbox
