import React, {useState} from "react";
import s from "./ProfileInfo.module.css";
import Logo from './../../Users/img/logo2.png';
import {ProfileType} from "../../../redux/propfile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatus/ProfileStatusWithHooks";
import {DragAndDrop} from "../../common/DragAndDrop/DragAndDrop";
import {ContentForm, FormType} from "./ContentForm/ContentForm";
import SuperButton from "../../common/Button/SuperButton";
import {useSelector} from "react-redux";
import {getPropfilePage} from "../../../redux/selectors/propfile-selectors";

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

    if (!props.profile) return <Preloader/>;

    let photoSmall = props.profile.photos.small ? props.profile.photos.small  : Logo
    let photoLarge = props.profile.photos.large ? props.profile.photos.large : Logo

    let img = <img onDoubleClick={()=>{setEditPhotoMode(!editPhotoMode)}} className={s.img} src={photoLarge || photoSmall}/>

    return (
        <div>

                <div className={s.descriptionBlock}>
                    <div className={s.content} style={{ margin: '15px 0 0 15px', padding:' 0 20px 0 0'}}>
                        {img}
                        <div>
                            {props.isOwner
                            && editPhotoMode
                            && <div style={{margin: '15px 0 0 30px'}}>
                                <DragAndDrop
                                    setEditPhotoMode={setEditPhotoMode}
                                    isOwner={props.isOwner}
                                    setPhoto={props.setPhoto}/>
                            </div>
                            }
                        </div>
                    </div>

                    <div className={s.contentWrap}>
                        <div className={s.content} style={{margin:' 0 0 20px 0'}}>
                        <div className={s.name}>{props.profile && props.profile.fullName}
                            <span>Double click on highlighted objects to edit your profile</span>
                        </div>

                        <div className={s.fragmentWrap} style={{textAlign: 'initial'}}>
                            <p> Status: </p> <ProfileStatusWithHooks isOwner={props.isOwner}
                                                                     updateStatus={props.updateStatus}
                                                                     status={props.status}/>
                        </div>
            </div>

                            {props.updateMode
                                ? <div className={s.content}>
                                    <ContentForm
                                    setPhoto={props.setPhoto}
                                    isOwner={props.isOwner}
                                    profile={props.profile}
                                    setProfile={props.setProfile}
                                    profileUpdateMode={props.profileUpdateMode}
                                    updateMode={props.updateMode}/>
                            </div>
                                : <div className={s.content}>
                                    <Content
                                    setPhoto={props.setPhoto}
                                    isOwner={props.isOwner}
                                    profile={props.profile}
                                    setProfile={props.setProfile}
                                    profileUpdateMode={props.profileUpdateMode}
                                    updateMode={props.updateMode}/>
                                </div>
                            }

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
    updateMode:boolean
    setProfile:(file:FormType)  => void
}
const Content = (props:ContentType) => {
    const [editMode, setEditMode] = useState(false)

    const submitHandler = () => {props.profileUpdateMode(true)}

    return <div>

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
            <p>Yes!</p>
           </>}
        </div>
        <div  className={s.fragmentWrap}>
            {props.profile?.lookingForAJob &&
            <>
                <p> My skills: </p>
                <p>{props.profile?.lookingForAJobDescription || 'lookingForAJobDescription'}</p>
            </>}
        </div>
        <div  className={s.fragmentWrap}>
            {!editMode
                ? <div className={s.detailsWrap} onClick={() => {
                    setEditMode(true)
                }}>

                    <div className={s.highlight}>
                        <span>Show contacts</span>
                    </div>
                </div>
                : <div>
                    <div className={s.detailsWrap} onClick={() => {
                        setEditMode(false)
                    }}>

                        <div style={{paddingLeft: '94px'}} className={s.highlight}>
                            <span> Hide contacts</span>
                        </div>

                    </div>
                    <p style={{textAlign: 'initial'}}> Contacts: {
                        Object
                            .entries(props.profile?.contacts ? props.profile?.contacts : {})
                            .map((key, value) => {
                                return <div key={value} className={s.fragmentWrap} style={{marginLeft: '20px'}}>
                                    <p> {key[0]}: </p> <p>{key[1]}</p>
                                </div>
                            })}</p>
                </div>}

        </div>
        {props.isOwner && <SuperButton
            style={{width: '50%', opacity: '0.7'}}
            onClick={submitHandler}> edit profile</SuperButton>}
    </div>
}


export default ProfileInfo;
