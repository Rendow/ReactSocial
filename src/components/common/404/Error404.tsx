import React from 'react'
import s from './Error404.module.css'

function Error404() {
    return (

        <div className={s.errorWrap}>
            <div className={s.errorBox}>
                <div className={s.err}>4</div>
                <div className={s.err}>0</div>
                <div className={s.err}>4</div>
            </div>
            <div className={s.msg}>Maybe this page moved? Got deleted? Is hiding out in a secret place? Never existed in
                the first place?<p>Let's go <a href="#">home</a> and try from there.</p></div>
        </div>

    )
}

export default Error404
