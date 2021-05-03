import React, {ChangeEvent} from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {MyPostsMapDispatchToPropsType, MyPostsMapStateToPropsType} from "./MyPostsContainer";
import {Button, TextField} from "@material-ui/core";


export type MyPostsPropsType = MyPostsMapStateToPropsType & MyPostsMapDispatchToPropsType


function MyPosts(props: MyPostsPropsType) {

     let PostsElements =
        props.posts.map (post => <Post message={post.messages} like={post.likesCount} />)

     let newPostElement = React.createRef<HTMLDivElement>()

    const onPostChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let text = event.currentTarget.value
        props.onChange(text);
    }
    let addPost = () => {
        props.onClick()
    }
    return (
        <div className={classes.content}>

            <div className={classes.postBlock}>
                <div className={classes.header}>
                    <h4>My publications</h4>
                </div>
                <div>
                    <TextField
                        color={"primary"}
                        style={{margin:'10px 0'}}
                        onChange={onPostChange}
                        value={props.newPostText}
                        ref={newPostElement}
                        variant={"outlined"}> </TextField>
                </div>
                <div>
                    <Button variant={"contained"} disabled={props.newPostText === ''} onClick={addPost}> Publish</Button>
                </div>
            </div>
            <div className={classes.posts}>
                {PostsElements}
            </div>
        </div>

    )
}

export default MyPosts;