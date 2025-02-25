import React from 'react'
import { Field, reduxForm } from 'redux-form'
import s from './ProfileInfo/ProfileInfo.module.css'
import FormControl from '../common/FormsControls/FormsControls';
import styles from '../common/FormsControls/FormsControls.module.css'
const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div><button >Save</button></div>
        {error && <div className={styles.formSummaryError}>{error}</div>}
        <div><b>Full name:</b> <Field child="input" component={FormControl} placeholder={'Full Name'} name={'fullName'} validate={[]} type="text" /></div>
        <div><b>Looking for a job:</b> <Field child="input" component={FormControl} name={'lookingForAJob'} validate={[]} type="checkbox" /></div>

        <div><b>My proffesinal skills:</b> <Field child="textarea" component={FormControl} placeholder={'My proffesinal skills'} name={'lookingForAJobDescription'} validate={[]} type="text" /></div>
        <div><b>About me:</b> <Field child="textarea" component={FormControl} placeholder={'About me'} name={'aboutMe'} validate={[]} type="text" /></div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}</b> <Field child="input" component={FormControl} placeholder={key} name={'contacts.' + key} validate={[]} />
                </div>
            })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({ form: 'editProfile', destroyOnUnmount: false })(ProfileDataForm)
export default ProfileDataFormReduxForm;