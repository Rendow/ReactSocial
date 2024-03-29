import React from "react";
import {ContentType} from "../ProfileInfo";
import s from "../ProfileInfo.module.css";
import {Field, Form, Formik} from "formik";
import SuperButton from "../../../common/Button/SuperButton";
import {FormInput} from "../../../common/FormsControl/FormsControls";
import SuperCheckbox from "../../../common/Checkbox/SuperCheckbox";


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
    }

    let fullName = props.profile?.fullName && props.profile?.fullName
    let aboutMe = props.profile?.aboutMe && props.profile?.aboutMe
    let lookingForAJob = props.profile?.lookingForAJob && props.profile?.lookingForAJob
    let lookingForAJobDescription = props.profile?.lookingForAJobDescription && props.profile?.lookingForAJobDescription

    const formClass = s.fragmentWrap + ' ' + s.contentForm
    return <Formik
        initialValues={{fullName: fullName, aboutMe: aboutMe,lookingForAJob:lookingForAJob,lookingForAJobDescription:lookingForAJobDescription}}
        validate={contentFormValidate}
        onSubmit={submit}
    >
        {({isSubmitting}) => (
            <Form style={{paddingRight: '10px'}}>
                <div className={formClass}  style={{marginTop: '13px'}}>
                    <p> Full name: </p>
                    <Field component={FormInput} placeholder={'Full name'} type="text" name="fullName"/>
                </div>

                <div className={formClass}>
                    <p> Description: </p>
                    <Field component={FormInput} placeholder={'About me'} type="text" name="aboutMe"/>
                </div>
                <div className={s.fragmentWrap}>
                    <p> Looking for a job: </p>
                    <Field component={SuperCheckbox} type="checkbox" name="lookingForAJob"/>
                </div>
                <div className={s.fragmentWrap  + ' ' + s.contentForm} style={{marginTop:'7px'}}>
                        <p> My skills: </p>
                        <Field component={FormInput} placeholder={'My skills'} type="text" name="lookingForAJobDescription"/>
                </div>
                <div className={s.fragmentWrap}>
                         <p> Contacts: {
                            Object
                                .entries(props.profile?.contacts ? props.profile?.contacts : {})
                                .map((key, value) => {
                                    return <div key={value} className={s.fragmentWrap} style={{justifyContent: 'space-between',marginLeft: '20px'}}>
                                        <p> {key[0]}: </p>
                                        <Field style={{marginBottom:'5px'}} component={FormInput} placeholder={key[0]} type="text" name={'contacts.' + key[0]}/>
                                    </div>})}
                        </p>
                </div>
                <SuperButton
                    style={{width: '50%', opacity:'0.7'}}
                    type="submit"
                    disabled={isSubmitting}>
                    submit changes
                </SuperButton>

            </Form>
        )}
    </Formik>
}

