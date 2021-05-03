import React from "react";
import classes from "./ProfileInfo.module.css";
import Logo from './../MyPosts/Post/img.webp';
import {ProfileType} from "../../../Redux/propfile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";

type PropsType = {
    profile: ProfileType | null
}

function ProfileInfo(props: PropsType) {
    if (!props.profile) return <Preloader/>;

    let photo = props.profile.photos.small ? props.profile.photos.large : Logo
    let img = <img src={photo}/>

    return (
        <div>
            <div className={classes.descriptionBlock}>
                {img}
                <div className={classes.description}> Hello! Nice to meet you on my page. Now page look not so good, but only because i working on functional.  There is will be beautiful design in the future.
                </div>
            </div>

        </div>

    )
}

export default ProfileInfo;