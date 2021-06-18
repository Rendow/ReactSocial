import React, {useEffect} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";

type PathParamsType = { userId: string }

type PropsType = RouteComponentProps<PathParamsType>

 function Settings  (props:PropsType) {
    useEffect(() => {
        document.title = 'Settings'
    },[])

     console.log( props.match.params.userId)
    return (
        <div>
            <div>Settings</div>
            <div> { props.match.params.userId === undefined && <input type="file"/> } </div>

        </div>
    )
}

export default  compose<React.ComponentType> (withRouter)(Settings)

//todo add set photo
//todo add set backgrounds
//todo add classname library