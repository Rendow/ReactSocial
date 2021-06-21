import s from "./ProfileStatus.module.css";
import React, {ChangeEvent, useEffect, useState} from "react";

 type PropsType = {
     status: string
     updateStatus:(text:string) => void
 }
export const ProfileStatusWithHooks = (props: PropsType) => {
    const [editMode, setEditMode] = useState(true)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    },[props.status])

    const deactivateEditMode = () => {
        props.updateStatus(status)
        setEditMode(true)
    }
    const onKeyPressInput = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter')  deactivateEditMode()
    }
    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    let checkedStatus = props.status === null ? 'Hello!' : props.status

    return <div style={{flexWrap: 'wrap'}}>
        {editMode &&
        <div className={s.statusInputDiv}>
            <span onDoubleClick={(() => {setEditMode(false)})}>
                {checkedStatus}
            </span>
        </div>}
        {!editMode &&
        <div className={s.changeStatusDiv}>
            <input
                onChange={onStatusChange}
                autoFocus={true}
                onBlur={deactivateEditMode}
                className={s.statusInput}
                type="text"
                value={status}
                onKeyPress={onKeyPressInput}
            />
        </div>}
    </div>
}