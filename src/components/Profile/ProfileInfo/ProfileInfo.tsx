import React, {useState} from "react";
import s from "./ProfileInfo.module.css";
import Logo from './../../Users/img/logo2.png';
import {ProfileType} from "../../../redux/propfile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatus/ProfileStatusWithHooks";
import {DragAndDrop} from "../../common/DragAndDrop/DragAndDrop";
import {ContentForm, FormType} from "./ContentForm/ContentForm";
import SuperButton from "../../common/FormsControl/SuperButton";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus:(text:string) => void
    setPhoto:(file:string | Blob) => void
    isOwner:boolean
    profileUpdateMode:(value:boolean) => void
    updateMode:boolean
    setProfile:(file:FormType)  => void
}

function ProfileInfo(props: PropsType) {

    const [editPhotoMode, setEditPhotoMode] = useState(false)
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) return <Preloader/>;

    let photoSmall = props.profile.photos.small ? props.profile.photos.small  : Logo
    let photoLarge = props.profile.photos.large ? props.profile.photos.large : Logo

    let img = <img onDoubleClick={()=>{setEditPhotoMode(!editPhotoMode)}} className={s.img} src={photoLarge || photoSmall}/>

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div>
                    {img}
                    <div>
                        {props.isOwner
                        && editPhotoMode
                        && <div style={{margin:'15px 0 0 30px'}}>
                            <DragAndDrop
                            setEditPhotoMode={setEditPhotoMode}
                            isOwner={props.isOwner}
                            setPhoto={props.setPhoto}/>
                        </div>
                        }
                    </div>
                </div>

                <div className={s.contentWrap}>
                    <div className={s.name}>{props.profile && props.profile.fullName}
                        <span>Double click on highlighted objects to edit your profile</span>
                    </div>

                    <div  className={s.fragmentWrap}>
                        <p> Status: </p> <ProfileStatusWithHooks isOwner={props.isOwner} updateStatus={props.updateStatus} status={props.status}/>
                    </div>

                    {!editMode
                        ? <div className={s.detailsWrap}  onClick={()=>{setEditMode(true)}}>
                            <div > Show details</div>
                            <div className={s.details}/>
                        </div>
                        : <>
                            {props.updateMode
                                ? <ContentForm
                                    setEditMode={setEditMode}
                                    setPhoto={props.setPhoto}
                                    isOwner={props.isOwner}
                                    profile={props.profile}
                                    setProfile={props.setProfile}
                                    profileUpdateMode={props.profileUpdateMode}
                                    updateMode={props.updateMode}/>
                                : <Content
                                    setEditMode={setEditMode}
                                    setPhoto={props.setPhoto}
                                    isOwner={props.isOwner}
                                    profile={props.profile}
                                    setProfile={props.setProfile}
                                    profileUpdateMode={props.profileUpdateMode}
                                    updateMode={props.updateMode}/>
                            }
                        </>
                    }


                    <div className={s.textBlock}>
                        <div className={s.description}>Do you know that Falcon 9 is a reusable, two-stage rocket
                            manufactured by SpaceX for the reliable and safe transport of people and
                            payloads into Earth orbit and beyond? Now you know.
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export type ContentType = {
    profile: ProfileType | null
    setPhoto:(file:string | Blob) => void
    isOwner:boolean
    profileUpdateMode:(value:boolean) => void
    setEditMode:(value:boolean) => void
    updateMode:boolean
    setProfile:(file:FormType)  => void
}
const Content = (props:ContentType) => {
    const submitHandler = () => {
        props.profileUpdateMode(true)
    }

    return <div>
        <div className={s.detailsWrap}  onClick={()=>{props.setEditMode(false)}}>
            <div> Hide details</div>
            <div className={s.details}/>
        </div>

        <div  className={s.fragmentWrap}>
            <p> Full name: </p> <p>{props.profile?.fullName}</p>
        </div>

        <div  className={s.fragmentWrap}>
            <p> Description: </p> <p>{props.profile?.aboutMe}</p>
        </div>
        <div  className={s.fragmentWrap}>
            {props.profile?.lookingForAJob &&
            <>
           <p> Looking for a job: </p>
            <p>yes</p>
           </>}
        </div>
        <div  className={s.fragmentWrap}>
            {props.profile?.lookingForAJob &&
            <>
                <p> My skills: </p>
                <p>{props.profile?.lookingForAJobDescription || 'lookingForAJobDescription'}</p>
            </>}
        </div>
        <div  className={s.fragmentWrap} >
            <p> Contacts:  {
                Object
                    .entries(props.profile?.contacts ? props.profile?.contacts : {})
                    .map((key,value) => {
                        return   <div key={value} className={s.fragmentWrap} style={{marginLeft:'20px'}}>
                            <p> {key[0]}: </p> <p>{key[1]}</p>
                        </div>
                    })}</p>
        </div>
        {props.isOwner && <SuperButton
            style={{width: '20%'}}
            onClick={submitHandler}> edit</SuperButton>}
    </div>
}





export default ProfileInfo;