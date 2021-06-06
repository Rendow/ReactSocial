import React, {useEffect} from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControl/FormsControls";
import {maxLenghtCreator, minLenghtCreator, required} from "../../utils/validators/validators";
import SuperButton from "../common/FormsControl/SuperButton";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {ReduxStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import s from "../common/FormsControl/FormsControls.module.css";


export type FormDataType = {
    email:string
    password:string
    rememberMe:boolean
}

let maxLength = maxLenghtCreator(20)
let minLength = minLenghtCreator(4)

export const LoginForm = (props:InjectedFormProps<FormDataType>) => {

    useEffect(() => {
        document.title = 'Login'
    },[])

    return <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'   Email'}
                       style={{height: '35px'}}
                       validate={[required]}
                       name={'email'}
                       component={Input}
                />
            </div>
            <div>
                <Field placeholder={'   Password'}
                       style={{height: '35px'}}
                       validate={[required, maxLength, minLength]}
                       type={'password'}
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
            {props.error && <div className={s.errorTextarea}>{props.error}</div>}
        </form>
    </div>
}

export const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

type LoginType = mapStateToPropsType & {
    login:(email:string, password:string, rememberMe:boolean) => void
}

const Login = (props:LoginType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email,formData.password,formData.rememberMe)
    }

    if(props.isAuth){ return <Redirect to={'/profile'}/> }

    return <div>
         <div>Login</div>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

type mapStateToPropsType = {
    isAuth:boolean
}
let mapStateToProps = (state: ReduxStateType):mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}
export default connect (mapStateToProps,{login})(Login)