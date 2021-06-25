import React from "react";
import {ContentType} from "../ProfileInfo";
import s from "../ProfileInfo.module.css";
import {InjectedFormProps} from "redux-form";


type FormDataType = {
    fullName: string
    password: string
    rememberMe: boolean
}
type ContentFormType = InjectedFormProps<FormDataType> & ContentType

export const ContentForm = (props:ContentType ) => {
    return   <form>
        <button onClick={()=> {props.setEditMode(false)}}> submit</button>
        {/*{props.error && <div className={s.errorTextarea}>{props.error}</div>}*/}
        <div  className={s.fragmentWrap}>
            <p> fullname: </p>
            <p> {props.profile?.fullName}</p>
        </div>
        <div  className={s.fragmentWrap}>
            <p> aboutMe: </p> <p>{props.profile?.aboutMe}</p>
        </div>

        <div  className={s.fragmentWrap}>
            {props.profile?.lookingForAJob &&
            <>
                <p> lookingForAJobDescription: </p>
                <p>{props.profile?.lookingForAJobDescription || 'lookingForAJobDescription'}</p>
            </>}
        </div>
        <div  className={s.fragmentWrap} >
            <p> Contacts:  {
                Object.entries(props.profile?.contacts ? props.profile?.contacts : {})
                    .map((key,value) => {
                        return   <div key={value} className={s.fragmentWrap} style={{flexFlow:"column",marginLeft:'20px'}}>
                            <p> {key[0]}: </p> <p>{key[1]}</p>
                        </div>
                    })}</p>
        </div>
    </form>
}

