import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {MyPostsMapDispatchToPropsType, MyPostsMapStateToPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FormDataType} from "../../Login/Login";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControl/FormsControls";
import SuperButton from "../../common/Button/SuperButton";


export type MyPostsPropsType = MyPostsMapStateToPropsType & MyPostsMapDispatchToPropsType

const MyPosts = React.memo((props: MyPostsPropsType) => {

    let PostsElements =
        props.posts.map(post => <Post key={post.id} message={post.messages} like={post.likesCount}/>)

    let addPost = (text: any) => {
        props.onClick(text.newPostText)
    }

    return (
        <div className={classes.content}>
            <div className={classes.postBlock}>
                <div className={classes.header}>
                    <h4> My publications.</h4>
                </div>
                <AddNewPostFormRedux onSubmit={addPost}/>
            </div>
            <div className={classes.posts}>
                {PostsElements}
            </div>
        </div>
    )
});

let maxLength = maxLengthCreator(20)
let minLength = minLengthCreator(4)

const AddNewPostForm = (props:InjectedFormProps<FormDataType> ) => {
    return  <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={'  Enter your message'}
                    style={{margin: '10px 0'}}
                    name={'newPostText'}
                    component={Textarea}
                    validate={[required, maxLength, minLength]}
                />
            </div>
            <SuperButton>
                Publish
            </SuperButton>
        </form>
    </div>
}

export const AddNewPostFormRedux = reduxForm<FormDataType >({form: 'profileAddMessageForm'})(AddNewPostForm)

export default MyPosts;