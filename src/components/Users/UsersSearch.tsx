import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";
import SuperButton from "../common/Button/SuperButton";
import {FormInput, FormSelect} from "../common/FormsControl/FormsControls";
import s from "./Users.module.css";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";

const usersSearchValidate = (values: any) => {
    const errors = {};
    return errors;
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = 'true' | 'false' | 'null';
type FormType = {
    term:string
    friend: FriendFormType
}
export const UsersSearch:React.FC<PropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter)

    const submit = (values:FormType, { setSubmitting }:{setSubmitting:(isSubmitting: boolean) => void}) => {
        const filter:FilterType = {
            term:values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return  <Formik
        enableReinitialize={true}
        initialValues={{ term: filter.term, friend:String(filter.friend) as FriendFormType}}
        validate={usersSearchValidate}
        onSubmit={submit}
    >
        {({ isSubmitting }) => (
            <Form className={s.form} >
                <Field component={FormSelect}  name="friend" type="select" >
                    <option value="null">All</option>
                    <option value="true">Only followed</option>
                    <option value="false">Only unfollowed</option>
                </Field>
                <Field placeholder={'  Find...'}  component={FormInput}  type="text" name="term" />
                <SuperButton style={{width:'20%'}} type="submit" disabled={isSubmitting}>
                    Find
                </SuperButton>
            </Form>
        )}
    </Formik>
})