import React, {useEffect} from 'react';
import classes from './News.module.css'

function News  () {
    useEffect(() => {
        document.title = 'News'
    },[])
    return (
        <div >
           news
        </div>
    )
}

export default News