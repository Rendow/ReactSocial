import React from "react";
import classes from "./ProfileInfo.module.css";
import Logo from './../MyPosts/Post/img.webp';
import {ProfileType} from "../../../redux/propfile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus:(text:string) => void
}

function ProfileInfo(props: PropsType) {
    if (!props.profile) return <Preloader/>;

    let photo = props.profile.photos.small ? props.profile.photos.large : Logo
    let img = <img src={photo}/>

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <div>{img}</div>
                <div className={classes.textBlock}>
                    <div className={classes.status}>
                        <div className={classes.name}>{props.profile.fullName} </div>
                        <ProfileStatusWithHooks  updateStatus= {props.updateStatus} status={props.status} /></div>
                    <div className={classes.description}>Do you know that Falcon 9 is a reusable, two-stage rocket manufactured by SpaceX for the reliable and safe transport of people and
                        payloads into Earth orbit and beyond? Now you know.
                    </div>

                </div>

            </div>
        </div>

    )
}

export default ProfileInfo;