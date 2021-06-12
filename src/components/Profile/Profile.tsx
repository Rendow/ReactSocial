import React, {useEffect} from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from './Profile.module.css'
import {ProfileType} from "../../redux/propfile-reducer";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus:(text:string) => void
}
function Profile(props:PropsType) {

    useEffect(() => {
        document.title =  props.profile?.fullName ? props.profile?.fullName : 'Profile'
    },[props.profile?.fullName])

    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
            />
            <MyPostsContainer/>
        </div>

    )
}

export default Profile;