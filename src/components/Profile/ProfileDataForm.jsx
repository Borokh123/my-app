import React from 'react'
import { Field, reduxForm } from 'redux-form'
import s from './ProfileInfo/ProfileInfo.module.css'
import FormControl from '../common/FormsControls/FormsControls';
import styles from '../common/FormsControls/FormsControls.module.css'
import UserPhoto from '../../assets/images/userPng.png'
const ProfileDataForm = ({ handleSubmit, profile, error, isOpen, onClose, savePhoto, isOwner }) => {
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])

        }
    }

    if (!isOpen) return null;
    return <div className={s.popup}>
        <div className={s.popupContent}>
            {/* <div className={s.mainPhotoBlock}>
                <div className={s.PhotoBlock}>
                    <img src={profile.photos.large || UserPhoto} alt="" className={s.mainPhoto} />
                </div>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
            </div> */}
       
            <form className={s.profileDataForm} onSubmit={handleSubmit}>
                <div className={s.profilePopupHeader}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" onClick={onClose}>
                        <g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g>
                    </svg>
                    <span>Edit profile</span>
                    <button >Save</button>
                </div>
                <div className={s.editPhotoBlock}>
                    <img src={profile.photos.large || UserPhoto} alt="" className={s.editmainPhoto} />
                    <div className={s.fileUpload}>
                        <label for="fileInput" class={s.customFileLabel}>
                            {isOwner && <input type={"file"} id="fileInput" class={s.hiddenInput} onChange={onMainPhotoSelected} />}
                            <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path></g></svg>
                        </label>
                    </div>


                </div>
                {error && <div className={styles.formSummaryError}>{error}</div>}
                <div><b>Full name:</b> <Field child="input" component={FormControl} placeholder={'Full Name'} name={'fullName'} validate={[]} type="text" /></div>
                <div><b>Looking for a job:</b> <Field child="input" className={s.checkbox} component={FormControl} name={'lookingForAJob'} validate={[]} type="checkbox" /></div>

                <div><b>My proffesinal skills:</b> <Field child="textarea" component={FormControl} placeholder={'My proffesinal skills'} name={'lookingForAJobDescription'} validate={[]} type="text" /></div>
                <div><b>About me:</b> <Field child="textarea" component={FormControl} placeholder={'About me'} name={'aboutMe'} validate={[]} type="text" /></div>
                <div>
                    <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                        return <div key={key} className={s.contact}>
                            <b>{key}</b> <Field child="input" component={FormControl} placeholder={key} name={'contacts.' + key} validate={[]} type="text" />
                        </div>
                    })}
                </div>
            </form>
        </div>
    </div>



}

const ProfileDataFormReduxForm = reduxForm({ form: 'editProfile', destroyOnUnmount: false })(ProfileDataForm)
export default ProfileDataFormReduxForm;