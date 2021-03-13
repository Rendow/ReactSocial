import React from "react";
import classes from "./ProfileInfo.module.css";
import Logo from './../MyPosts/Post/img.webp';

function ProfileInfo() {
    return (
        <div>
            <div>
                <img
                    src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg" alt=""/>
            </div>
            <div className={classes.descriptionBlock}>
                <div><img src={Logo} alt=""/></div>
                <div className={classes.description}>  Hello! Nice to meet you on my page. There is will be description about my page. You should wait for this.</div>
            </div>

        </div>

    )
}

export default ProfileInfo;