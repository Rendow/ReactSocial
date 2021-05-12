import React from "react";
import {addPostCreator, PostsType} from "../../../Redux/propfile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {ReduxStateType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";


export type MyPostsMapStateToPropsType = {
    posts:PostsType[]
    newPostText:string
}
export  type MyPostsMapDispatchToPropsType = {

    onClick:(text:any) => void
}
const mapStateToProps = (state:ReduxStateType):MyPostsMapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch:Dispatch):MyPostsMapDispatchToPropsType => {
    return {
        onClick: (text:any) => {
            dispatch(addPostCreator(text))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);


export default MyPostsContainer