import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";

const usersSearchValidate = (values: any) => {
    const errors = {};
    return errors;
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FormType = {
    term:string
    friend: 'true' | 'false' | 'null'
}
export const UsersSearch:React.FC<PropsType> = React.memo((props) => {

    const submit = (values:FormType, { setSubmitting }:{setSubmitting:(isSubmitting: boolean) => void}) => {
        const filter:FilterType = {
            term:values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return  <Formik
        initialValues={{ term: '', friend:'null'}}
        validate={usersSearchValidate}
        onSubmit={submit}
    >
        {({ isSubmitting }) => (
            <Form>
                <Field name="friend" as="select" >
                    <option value="null">All</option>
                    <option value="true">Only followed</option>
                    <option value="false">Only unfollowed</option>
                </Field>
                <Field type="text" name="term" />
                <button type="submit" disabled={isSubmitting}>
                    Find
                </button>
            </Form>
        )}
    </Formik>
})