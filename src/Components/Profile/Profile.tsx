import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost, ProfilePageType} from "../../Redux/State";
import s from './Profile.module.css'


type ProfilePropsType = {
    profilePage: ProfilePageType
    addPost:() => void
    updateNewPostText:(newText:string) => void
}

function Profile(props:ProfilePropsType) {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts addPost={props.addPost}
                     posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     updateNewPostText={props.updateNewPostText}
            />
        </div>

    )
}

export default Profile;