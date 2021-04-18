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

    let img = <img src={props.profile.photos.small} alt=""/> ? <img src={props.profile.photos.large} alt=""/> :
        <div><img src={Logo} alt=""/></div>
    return (
        <div>
            <div>
                <img
                    src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                    alt=""/>
            </div>
            <div className={classes.descriptionBlock}>

                {img}
                <div className={classes.description}> Hello! Nice to meet you on my page. There is will be description
                    about my page. You should wait for this.
                </div>
            </div>

        </div>

    )
}

export default ProfileInfo;