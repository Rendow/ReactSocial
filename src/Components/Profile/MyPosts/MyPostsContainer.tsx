import React from "react";
import {addPostCreator, ProfilePageType, updateNewPostCreator} from "../../../Redux/propfile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {ReduxStateType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";


export type MyPostsMapStateToPropsType = {
    profilePage:ProfilePageType
}
export  type MyPostsMapDispatchToPropsType = {
    onChange:(text:string) => void
    onClick:() => void
}
const mapStateToProps = (state:ReduxStateType):MyPostsMapStateToPropsType => {
    return {
        profilePage:state.profilePage
    }
}
const mapDispatchToProps = (dispatch:Dispatch):MyPostsMapDispatchToPropsType => {
    return {
        onClick: () => {
            dispatch(addPostCreator())
        },
        onChange: (text: string) => {
            let action = updateNewPostCreator(text);
            dispatch(action)
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);


export default MyPostsContainer