import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {useSelector} from "react-redux";
import {ReduxStateType} from "../../../redux/redux-store";
import {addPostCreator} from "../../../redux/propfile-reducer";
import {AddMessageFormik} from "../../common/addMessageForm/AddMessageFormik";
import {getPropfilePage} from "../../../redux/selectors/propfile-selectors";


const MyPosts = React.memo(() => {
    const {posts} = useSelector(getPropfilePage)

    let PostsElements =
        posts.map(post => <Post key={post.id} message={post.messages} like={post.likesCount}/>)

    return (
        <div className={s.content}>
            <div className={s.postBlock}>
                <AddMessageFormik placeholder={'Create new post'}
                                  buttonWidth={'initial'}
                                  addPost={addPostCreator}
                                //  textareaClass={s.myPstInput}
                                  style={{
                                      width: 'inherit',
                                      margin: '8px 0 0 0',
                                  }}
                />
            </div>
            <div className={s.posts}>
                {PostsElements}
            </div>
        </div>
    )
});

export default MyPosts;
