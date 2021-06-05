 import React, {useEffect} from 'react';
import classes from './Music.module.css'

function Music  () {
    useEffect(() => {
        document.title = 'Music'
    },[])
    return (
        <div >
      music
        </div>
    )
}

export default Music