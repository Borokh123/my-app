import React from 'react'
import styles from './users.module.css'
import UserPhoto from '../../assets/images/userPng.png'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { usersAPI } from '../../api/api';
import Paginator from '../common/Paginator/Paginator';
import FollowBtn from './FollowBtn';
const Users = (props) => {

    return (
        <div>
            <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged} portionSize={15} />          {
                props.users.map(u => <div className={styles.userCard} key={u.id}>
                    <div className={styles.photoNameFollow}>
                        <div className={styles.photoBlock}>
                            <NavLink to={'/profile/' + u.id}>
                                <img alt="userPhoto" src={u.photos.small != null ? u.photos.small : UserPhoto} className={styles.userPhoto} />
                            </NavLink>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.usersName}>{u.name}</div>
                            <div>{u.status}</div>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </div>
                    </div>
                    {/* <div className={styles.followBlockBtn}>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.unfollow(u.id)

                            }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => { //если в массиве хоть одна id = id пользователя то тогда (псевдоистина) =True (метод some)
                                props.follow(u.id)
                            }}>Follow</button>
                        }

                    </div> */}


                    <FollowBtn
                    followed={u.followed}
                    userId={u.id}
                    followingInProgress={props.followingInProgress}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    
                    
                    />


                </div >)
            }
        </div >
    )

}

export default Users