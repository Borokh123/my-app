import React from 'react'
import styles from './users.module.css'
import UserPhoto from '../../assets/images/userPng.png'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { usersAPI } from '../../api/api';
import Paginator from '../common/Paginator/Paginator';
const Users = (props) => {

    return (
        <div>
            <Paginator totalUsersCount= {props.totalUsersCount} pageSize ={props.pageSize} currentPage = {props.currentPage } onPageChanged ={props.onPageChanged } portionSize = {25}  />          {
                props.users.map(u => <div key={u.id}>
                    <span>

                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : UserPhoto} className={styles.userPhoto} />
                            </NavLink>

                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.unfollow(u.id)

                                }}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => { //если в массиве хоть одна id = id пользователя то тогда (псевдоистина) =True (метод some)
                                    props.follow(u.id)
                                }}>Follow</button>
                            }

                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>

                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
                </div >)
            }
        </div >
    )

}

export default Users