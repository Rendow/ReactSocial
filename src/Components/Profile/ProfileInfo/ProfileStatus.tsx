import s from "./ProfileInfo.module.css";
import React from "react";


export class ProfileStatus extends React.Component <any> {


    state = {
        editMode: false,
        text:'Hello There!'
    }
    activateEditMode = () => {
     this.setState({
        editMode:true
    })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode:false
        })
    }
    // setText () {
    //     this.setState({
    //         text:
    //     })
    // }
    render() {
        return <div>
            {!this.state.editMode &&
            <div className={s.statusInputDiv}>
                <span onDoubleClick={this.activateEditMode} > {this.state.text}</span>
            </div>}
            {this.state.editMode &&
            <div  className={s.statusInputDiv}>
                <input onChange={(e) => {this.setState({text: e.currentTarget.value })}}
                       autoFocus={true} onBlur={this.deactivateEditMode}
                       className={s.statusInput}
                       type="text" value={this.state.text}/>
            </div>}
        </div>
    }

}