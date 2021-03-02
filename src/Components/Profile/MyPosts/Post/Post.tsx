import React from "react";
import classes from "./Post.module.css";


type PostType = {
    img:string
    message:string
    like:number
}

function Post(props:PostType) {

    return (

        <div className={classes.content}>

            <img src= {props.img} alt=""/>
            {props.message}
            <div>
                <span> like {props.like}</span>
            </div>

        </div>

    )
}

export default Post;