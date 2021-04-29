import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from './Profile.module.css'
import { ProfileType } from "../../Redux/propfile-reducer";
import {Redirect} from "react-router-dom";

type PropsType = {
    profile: ProfileType | null
}
function Profile(props:PropsType) {
    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>

    )
}

export default Profile;