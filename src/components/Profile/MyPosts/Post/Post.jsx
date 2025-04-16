import React from 'react'
import s from './Post.module.css'
import UserPhoto from './../../../../assets/images/userPng.png'

const Post = (props) => {

    if (!props.profile) {
        // Если данные profile еще не загружены, возвращаем null или заглушку
        return null;
    }

    return (


        <div className={s.item}>
            <div className={s.messageBlock}>
            <img src={props.profile.photos.small || UserPhoto} alt="" className={s.mainPhoto} alt="" />
            </div>
            <div className={s.messageBlock}>
            <span className={s.fullName}>{props.profile.fullName}</span>  
            <span className={s.post}>{ props.message } </span>
            </div>
          
            
            {/* <div>
                <span>Лайков:{props.like}</span>
            </div> */}
        </div>




    )
}


export default Post