import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";


export type FormDataType = {
    login:string
    password:string
    rememberMe:boolean
}
export const LoginForm = (props:InjectedFormProps<FormDataType>) => {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={'login'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={'input'}/>
            </div>
            <div>
                <Field component={'input'} name={'rememberMe'} type={"checkbox"}/> Remember me</div>
            <div>
                <button>Login</button>
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