import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import store, {ProfilePageType} from "../../Redux/State";
import s from './Profile.module.css'


type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch:(action:any) => void
}

function Profile(props:ProfilePropsType) {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts
                     posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch.bind(store)}
            />
        </div>

    )
}

export default Profile;