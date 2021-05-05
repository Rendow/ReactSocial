import s from "./ProfileInfo.module.css";
import React, {ChangeEvent} from "react";

 type PropsType = {
     status: string
     updateStatus:(text:string) => void
 }
export class ProfileStatus extends React.Component<PropsType> {
    state = {
        editMode: false,
        status:this.props.status
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
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps:{status: string},prevState: { editMode: false, status: string }) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status:this.props.status
            })
        }
    }

    render() {
        let status = this.state.status === null ? 'Hello!' : this.state.status
        return <div>
            {!this.state.editMode &&
            <div className={s.statusInputDiv}>
                <span onDoubleClick={this.activateEditMode} > {status}</span>
            </div>}
            {this.state.editMode &&
            <div  className={s.statusInputDiv}>
                <input onChange={this.onStatusChange}
                       autoFocus={true} onBlur={this.deactivateEditMode}
                       className={s.statusInput}
                       type="text" value={status}/>
            </div>}
        </div>
    }

}