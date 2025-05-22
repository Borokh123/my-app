import React, { FC } from 'react'
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { Navigate } from 'react-router-dom'
type PropsType = {
    profile: object | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: object) => Promise<any>

}


const Profile: FC<PropsType> = (props) => {

    return (
        <div className={s.profile}>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
            />

            <MyPostsContainer />
        </div>
    )
}

export default Profile