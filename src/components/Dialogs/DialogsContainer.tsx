import React from 'react';
import {InitialStateType, sendMessageCreator} from '../../redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {ReduxStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


export type DialogsMapStateToPropsType = {
    dialogsPage: InitialStateType
}
export type DialogsMapDispatchToPropsType = {
    sendMessage:(text:any) => void
}
const mapStateToProps = (state:ReduxStateType):DialogsMapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch:Dispatch):DialogsMapDispatchToPropsType => {
    return {
        sendMessage: (text:any) => {
           dispatch(sendMessageCreator(text))
        }
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps,mapDispatchToProps), WithAuthRedirect)(Dialogs)












