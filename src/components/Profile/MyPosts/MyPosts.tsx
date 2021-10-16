import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControl/FormsControls";
import SuperButton from "../../common/Button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {ReduxStateType} from "../../../redux/redux-store";
import {addPostCreator} from "../../../redux/propfile-reducer";




type FormDataType = {
    newPostText: string
}

const MyPosts = React.memo(() => {
    const {posts,newPostText} = useSelector((state:ReduxStateType) => state.profilePage)
    const dispatch = useDispatch()

    let PostsElements =
        posts.map(post => <Post key={post.id} message={post.messages} like={post.likesCount}/>)

    let addPost = (text:FormDataType) => {
        dispatch(addPostCreator(text.newPostText))
    }

    return (
        <div className={classes.content}>
            <div className={classes.postBlock}>
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
                    placeholder={'Create new post'}
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