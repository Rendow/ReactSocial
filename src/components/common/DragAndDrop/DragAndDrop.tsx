import React, {useState} from "react";
import s from "./DragAndDrop.module.css";

type DragType = {
    setPhoto?:(file:string | Blob) => void
    setEditPhotoMode?: (value:boolean) => void
    isOwner?:boolean
}
export const DragAndDrop = (props:DragType) => {

    const [drag, setDrag] = useState(false)

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(true)
    }
    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(false)
    }
    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        if(e.dataTransfer.files[0]){
            let files = e.dataTransfer.files[0]
            props.setPhoto && props.setPhoto(files)
        }
        setDrag(false)
        props.setEditPhotoMode && props.setEditPhotoMode(false)
    }

    return   <div className={s.dragWrap}>
        {drag
            ? <div
                className={s.drop}
                onDragStart={(e)=>{dragStartHandler(e)}}
                onDragOver={(e)=>{dragStartHandler(e)}}
                onDragLeave={(e)=>{dragLeaveHandler(e)}}
                onDrop={(e)=>{onDropHandler(e)}}
            > Drop file  </div>
            : <div
                className={s.drag}
                onDragStart={(e)=>{dragStartHandler(e)}}
                onDragOver={(e)=>{dragStartHandler(e)}}
                onDragLeave={(e)=>{dragLeaveHandler(e)}}
            >  Drag file </div>
        }

    </div>
}

//todo add pop-up when file download