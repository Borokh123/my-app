import React from 'react'
import s from './../Navbar.module.css'

const Freinds = (props) => {
    return (
        <div className={s.friendBlock}>
            <div className={s.friendImg}><img src= {props.imgSrc} alt="" />
            </div>
            <div className={s.friendName}>{props.name}</div>

        </div>
    )
}

export default Freinds