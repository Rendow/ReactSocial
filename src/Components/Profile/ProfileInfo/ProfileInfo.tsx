import React from "react";
import classes from "./ProfileInfo.module.css";


function ProfileInfo() {
    return (
        <div>
            <div>
                <img
                    src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg" alt=""/>
            </div>
            <div className={classes.descriptionBlock}>
                ava+desc
            </div>

        </div>

    )
}

export default ProfileInfo;