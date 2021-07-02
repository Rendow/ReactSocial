import React, {useEffect} from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from './Profile.module.css'
import {ProfileType} from "../../redux/propfile-reducer";
import {Redirect} from "react-router-dom";
import {FormType} from "./ProfileInfo/ContentForm/ContentForm";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus:(text:string) => void
    setPhoto:(file:string | Blob) => void
    isAuth: boolean
    isOwner:boolean
    profileUpdateMode:(value:boolean) => void
    updateMode:boolean
    setProfile:(file:FormType)  => void
}
function Profile(props:PropsType) {

    useEffect(() => {
        document.title =  props.profile?.fullName ? props.profile?.fullName : 'Profile'
    },[props.profile?.fullName])

        if(!props.isAuth){ return <Redirect to={'/login'}/> }

    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isOwner={props.isOwner}
                         setPhoto={props.setPhoto}
                         profileUpdateMode={props.profileUpdateMode}
                         updateMode={props.updateMode}
                         setProfile={props.setProfile}
            />

            <MyPostsContainer/>
        </div>

    )
}

export default Profile;