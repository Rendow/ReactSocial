import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControl/FormsControls";
import {maxLenghtCreator, minLenghtCreator, required} from "../../utils/validators/validators";
import SuperButton from "../common/FormsControl/SuperButton";


export type FormDataType = {
    login:string
    password:string
    rememberMe:boolean
}
let maxLength = maxLenghtCreator(20)
let minLength = minLenghtCreator(4)
export const LoginForm = (props:InjectedFormProps<FormDataType>) => {

    return <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'   Login'}
                       style={{height: '35px'}}
                       validate={[required, maxLength, minLength]}
                       name={'login'}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={'   Password'}
                       style={{height: '35px'}}
                       validate={[required, maxLength, minLength]}
                       name={'password'}
                       component={Input}/>
            </div>
            <div>
                <Field component={'input'}
                       name={'rememberMe'}
                       type={"checkbox"}/> Remember me</div>
            <div>
                <SuperButton> Login</SuperButton>
            </div>
        </form>
    </div>
}

export const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


export const Login = () => {

    const onSubmit = (formData:FormDataType) => {
        console.log(formData)
    }
    return <div>
        <div>Login</div>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}