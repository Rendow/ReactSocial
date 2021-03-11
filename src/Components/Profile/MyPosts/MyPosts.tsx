import React, {ChangeEvent} from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostsType} from "../../../Redux/State";


export type MyPostsPropsType = {
    posts:Array<PostsType>
    newPostText:string
    dispatch:(action:any) => void
}

function MyPosts(props: MyPostsPropsType) {

    let PostsElements =
        props.posts.map (post => <Post message={post.messages} like={post.likesCount} img={post.img}/>)

  let newPostElement = React.createRef<HTMLTextAreaElement>()

    let addPost = () =>  { props.dispatch({type:'ADD-POST'})}
    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let action = {type:'UPDATE-NEW-POST-TEXT', newText:event.currentTarget.value};
        props.dispatch(action)
    }
    return (
        <div className={classes.content}>

            <div className={classes.postBlock}>
                <div>
                    <h3>my posts</h3>
                </div>
                <div>
                    <textarea
                        onChange={onChangeHandler}
                        value={props.newPostText}
                        ref={newPostElement}> </textarea>
                </div>
                <div>
                    <button onClick={addPost}> Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {PostsElements}

            </div>
        </div>

    )
}

export default MyPosts;