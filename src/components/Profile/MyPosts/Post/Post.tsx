import React from "react";
import classes from "./Post.module.css";
import Logo from './img.webp';

type PostType = {
    message:string
    like:number
}

function Post(props:PostType) {

    return (

        <div className={classes.content}>

                <div className={classes.img}><img src={Logo} alt=""/></div>
                <div className={classes.message}> {props.message}</div>
                <div className={classes.like}>like {props.like}</div>
        </div>

    )
}

export default Post;