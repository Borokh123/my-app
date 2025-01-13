import React from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import Friends from './Friends/Friends'

const Navbar = (props) => {
  // let friendsElements = props.sideBar.friends.map((d) => <Friends name={d.name} id={d.id} imgSrc={d.imgSrc} />)
  return (
    <nav className={s.nav}>
      
      <div className={s.item}>
        <NavLink to='/profile'  >Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/dialogs' >Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/users'  >Users</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/news' >News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/music' >Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/settings' >Settings</NavLink>
        <h2>My Friends</h2>
        <div className={s.myFriends}>
          {/* {friendsElements} */}
        </div>

      </div>
    </nav>
  )
}

export default Navbar