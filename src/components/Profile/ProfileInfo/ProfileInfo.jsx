import React, { FC, useState } from 'react'
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import UserPhoto from '../../../assets/images/userPng.png'
import ProfileDataForm from '../ProfileDataForm'
import Popup from './Popup'
import FollowBtn from '../../Users/FollowBtn'





const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader />
    }

    // const onMainPhotoSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    //     if (e.target.files && e.target.files.length) {
    //         props.savePhoto(e.target.files[0])
    //     }
    // }
    const onSubmit = (formData)=> {
        props.saveProfile(formData)
            .then(
                () => {
                    setEditMode(false);

                })
            .catch((error) => {
                console.error('Ошибка при сохранении профиля:', error);
            });
    };


    return (

        <div>


            <div className={s.descriptionBlock}>
                <div className={s.mainPhotoBlock}>
                    <div className={s.PhotoBlock}>
                        {/* {props.isOwner && <FollowBtn/>} */}
                        <img src={props.profile.photos.large || UserPhoto} alt="" className={s.mainPhoto} />
                    </div>
                    {props.isOwner && <div className={s.editBlock}><button className={s.editBtn} type="button" onClick={() => { setEditMode(!editMode) }}>Edit profile</button></div>}
                    {/* {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}   */}
                </div>
                {editMode
                    ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} isOpen={editMode} onClose={() => { setEditMode(!editMode) }} savePhoto={props.savePhoto} isOwner={props.isOwner}  />
                    : <ProfileData goToEditMode={() => { setEditMode(!editMode) }} profile={props.profile} isOwner={props.isOwner} />}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} />

            </div>
        </div>
    )
}
const ProfileData: FC = ({ profile }) => {
    if (!profile) {
        return null; // or handle the null case appropriately
    }
    return <div className={s.profileData}>
        {/* {isOwner && <div className={s.editBlock}><button className={s.editBtn} type="button" onClick={goToEditMode}>Edit profile</button></div>} */}
        <div className={s.profileBlock}>
            <div className={s.fullName}> {profile.fullName}</div>
            <div><b>Looling for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}</div>
            {profile.lookingForAJob &&
                <div><b>My proffesinal skills:</b> {profile.lookingForAJobDescription}</div>
            }

            <div><b>About me:</b> {profile.aboutMe}</div>
            <div><b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
            </div>
        </div>

    </div>
}


const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
    )
}

export default ProfileInfo