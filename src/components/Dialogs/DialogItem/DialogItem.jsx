import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './../Dialogs.module.css'

const DialogItem = (props) => {
 
  let path = '/dialogs/' + props.id;
  return (
    <div className={s.dialog + ' ' + s.active} >
      <img src="https://pbs.twimg.com/media/GPrpm6fWMAA5G7r?format=jpg&name=large" alt="" />
      <NavLink to={path}>{props.name}</NavLink>

    </div>
  )
}

export default DialogItem