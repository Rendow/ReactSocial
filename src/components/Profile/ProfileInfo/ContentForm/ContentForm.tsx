import React from "react";
import {ContentType} from "../ProfileInfo";
import s from "../ProfileInfo.module.css";
import {Field, Form, Formik} from "formik";
import SuperButton from "../../../common/FormsControl/SuperButton";
import {FormInput} from "../../../common/FormsControl/FormsControls";


export type FormType = {
    fullName: string | null | undefined
    aboutMe: string | null | undefined
    lookingForAJob:boolean | null | undefined
    lookingForAJobDescription:string | null | undefined
}

const contentFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

export const ContentForm:React.FC<ContentType> = (props ) => {


    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setSubmitting(false)
        props.profileUpdateMode(false)
        props.setProfile(values)
        console.log(values)
    }

    let fullName = props.profile?.fullName && props.profile?.fullName
    let aboutMe = props.profile?.aboutMe && props.profile?.aboutMe
    let lookingForAJob = props.profile?.lookingForAJob && props.profile?.lookingForAJob
    let lookingForAJobDescription = props.profile?.lookingForAJobDescription && props.profile?.lookingForAJobDescription

    return <Formik
        initialValues={{fullName: fullName, aboutMe: aboutMe,lookingForAJob:lookingForAJob,lookingForAJobDescription:lookingForAJobDescription}}
        validate={contentFormValidate}
        onSubmit={submit}
    >
        {({isSubmitting}) => (
            <Form>

                {/*{props.error && <div className={s.errorTextarea}>{props.error}</div>}*/}
                <div className={s.fragmentWrap}>
                    <p> Full name: </p>
                    <Field component={FormInput} placeholder={'Full name'} type="text" name="fullName"/>
                </div>

                <div className={s.fragmentWrap}>
                    <p> Information about me: </p>
                    <Field component={FormInput} placeholder={'About me'} type="text" name="aboutMe"/>
                </div>

                <div className={s.fragmentWrap}>
                    <p> Looking for a job: </p>
                    <Field type="checkbox" name="lookingForAJob"/>

                    <>
                        <p> Description: </p>
                        <Field component={FormInput} placeholder={'Description'} type="text" name="lookingForAJobDescription"/>
                    </>
                </div>
                <div className={s.fragmentWrap}>
                    <p> Contacts: {
                        Object.entries(props.profile?.contacts ? props.profile?.contacts : {})
                            .map((key, value) => {
                                return <div key={value} className={s.fragmentWrap}
                                            style={{flexFlow: "column", marginLeft: '20px'}}>
                                    <p> {key[0]}: </p> <p>{key[1]}</p>
                                </div>})}
                    </p>
                </div>
                <SuperButton

                    style={{width: '20%'}}
                    type="submit"
                    disabled={isSubmitting}>
                    submit
                </SuperButton>

            </Form>
        )}
    </Formik>
}

