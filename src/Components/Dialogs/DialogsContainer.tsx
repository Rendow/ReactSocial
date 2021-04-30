import React from 'react';
import {InitialStateType, sendMessageCreator, updateNewMessageCreator} from '../../Redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {Dispatch} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


export type DialogsMapStateToPropsType = {
    dialogsPage: InitialStateType
}
export type DialogsMapDispatchToPropsType = {
    updateNewMessageBody:(text:string) => void
    sendMessage:() => void
}
const mapStateToProps = (state:ReduxStateType):DialogsMapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch:Dispatch):DialogsMapDispatchToPropsType => {
    return {
     updateNewMessageBody: (text:string) => {
         let action = updateNewMessageCreator(text);
         dispatch(action)
     },
        sendMessage: () => {
           dispatch(sendMessageCreator())
        }
    }
}
const AuthRedirectComponent = WithAuthRedirect(Dialogs)


const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer











