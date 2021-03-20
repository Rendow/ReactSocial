import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from './Profile.module.css'


function Profile() {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>

    )
}

export default Profile;