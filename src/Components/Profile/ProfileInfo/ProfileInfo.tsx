import React from "react";
import classes from "./ProfileInfo.module.css";
import Logo from './../MyPosts/Post/img.webp';
import {ProfileType} from "../../../Redux/propfile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import { ProfileStatus } from "./ProfileStatus";

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
                    <div className={classes.status}> <ProfileStatus  updateStatus= {props.updateStatus} status={props.status} /></div>
                    <div className={classes.description}>Nice to meet you on my page.
                        Now page look not so good, but only because i working on functional. There is will be beautiful
                        design in the future.
                    </div>

                </div>

            </div>
        </div>

    )
}

export default ProfileInfo;