import React, {ChangeEvent} from "react";
import classes from "./ProfileInfo.module.css";
import Logo from './../../Users/img/logo2.png';
import {ProfileType} from "../../../redux/propfile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus:(text:string) => void
    setPhoto:(file:string | Blob) => void
    isOwner:boolean
}

function ProfileInfo(props: PropsType) {
    if (!props.profile) return <Preloader/>;

    let photoSmall = props.profile.photos.small ? props.profile.photos.small  : Logo
    let photoLarge = props.profile.photos.large ? props.profile.photos.large : Logo
    let img = <img className={classes.img} src={photoLarge || photoSmall}/>


    const photoHandler = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length){
            props.setPhoto(e.target.files[0])
        }
    }
    return (
        <div>
            <div className={classes.descriptionBlock}>
                <div >{img}</div>

                <div className={classes.textBlock}>
                    <div className={classes.status}>

                        <div className={classes.name}>{props.profile.fullName} </div>
                        { props.isOwner && <input type="file" onChange={photoHandler}/>}
                        <div  className={classes.statusWrap}>
                            <p style={{ marginRight:'10px'}} > Status: </p>
                                <ProfileStatusWithHooks  updateStatus={props.updateStatus} status={props.status}/>

                        </div>
                    </div>
                    <div className={classes.description}>Do you know that Falcon 9 is a reusable, two-stage rocket manufactured by SpaceX for the reliable and safe transport of people and
                        payloads into Earth orbit and beyond? Now you know.
                    </div>

                </div>

            </div>
        </div>

    )
}

export default ProfileInfo;