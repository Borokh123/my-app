import React, { useState } from 'react'
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import UserPhoto from '../../../assets/images/userPng.png'
import ProfileDataForm from '../ProfileDataForm'
import ProfileDataFormReduxForm from '../ProfileDataForm'


const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);


    if (!props.profile) {
        return <Preloader />
    }



    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])

        }
    }
    const onSubmit = (formData) => {
        props.saveProfile(formData)
        .then(
            () => {
                setEditMode(false);
            })
        .catch(error => {
            // Здесь можно, например, вывести уведомление или залогировать ошибку,
            // чтобы страница не "перебрасывалась".
            console.error('Ошибка при сохранении профиля:', error);
        });

    };
    return (

        <div>
            {/* <div>
                <img src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" alt="" className="" />

            </div> */}

            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || UserPhoto} alt="" className={s.mainPhoto} />
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                {editMode
                    ? <ProfileDataFormReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
                    : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={props.profile} isOwner={props.isOwner} />}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />

            </div>
        </div>
    )
}
const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return <div>
        {isOwner && <div><button type="button" onClick={goToEditMode}>Edit</button></div>}
        <div><b>Full name:</b> {profile.fullName}</div>
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
}


const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
    )
}

export default ProfileInfo