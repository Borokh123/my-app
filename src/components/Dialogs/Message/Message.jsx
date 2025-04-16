import React from 'react'
import s from './../Dialogs.module.css'

const Message = (props) => {
    return (
        <span className={s.message}>{props.message}</span>
    )
}

export default Message