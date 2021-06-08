import React, {ChangeEvent, useEffect, useState} from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControl/FormsControls";
import {maxLenghtCreator, minLenghtCreator, required} from "../../utils/validators/validators";
import SuperButton from "../common/FormsControl/SuperButton";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {ReduxStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import s from "./Login.module.css";
import SuperCheckbox from "../common/Checkbox/SuperCheckbox";


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

    const [checked, setChecked] = useState<boolean>(true)

    return <div>
        <form  className={s.loginWrap} onSubmit={props.handleSubmit}>
            <p className={s.login}>Login</p>
            <div>
                <Field placeholder={'   Email'}
                       style={{height: '35px', width:'100%'}}
                       validate={[required]}
                       name={'email'}
                       component={Input}
                />
            </div>
            <div>
                <Field placeholder={'   Password'}
                       style={{height: '35px', width:'100%'}}
                       validate={[required, maxLength, minLength]}
                       type={'password'}
                       name={'password'}
                       component={Input}/>
            </div>
            <div>
                <Field component={SuperCheckbox}
                       name={'rememberMe'}
                       type={"checkbox"}
                       checked={checked}
                       onChangeChecked={setChecked}
                >
                    Remember me
                    </Field>
            </div>
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