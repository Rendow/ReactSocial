import React, {useEffect} from 'react';
import classes from './Settings.module.css'

function Settings  () {
    useEffect(() => {
        document.title = 'Settings'
    },[])
    return (
        <div >
            Settings
        </div>
    )
}

export default Settings