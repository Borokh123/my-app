import React from 'react'
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = (props) => {
   
   
    if (!props.profile ) {
        return <Preloader/>
    }

    return (
        
        <div>
            {/* <div>
                <img src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" alt="" className="" />

            </div> */}

            <div className={s.descriptionBlock}>
                 <img src={props.profile.photos.large} alt="" /> 
                {/* <p className="">Status: {props.profile.aboutMe}</p> */}
                <ProfileStatusWithHooks status={props.status} updateStatus = {props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo