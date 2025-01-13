import React from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src="https://atg.kh.ua/c/image/data/logo_oc13.png" alt="" className="" />
      <div className={s.loginBlock}>
        {props.isAuth
          ? <div>{props.login} - <button onClick={props.logout}>logout</button></div>
          : <NavLink to={'/login'} >Login</NavLink>}
      </div>
    </header>
  )
}

export default Header