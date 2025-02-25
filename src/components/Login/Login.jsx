import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import FormControl from '../common/FormsControls/FormsControls'
import { connect } from 'react-redux'
import { login } from '../../redux/AuthReducer'
import { Navigate } from 'react-router-dom'
import styles from '../common/FormsControls/FormsControls.module.css'

const LoginForm = (props) => {
  
  return (
    <form onSubmit={props.handleSubmit}>
      <div><Field child="input" placeholder={'Email'} name={'email'} component={FormControl} validate={[required]} type="text" /></div>
      <div><Field child="input" placeholder={'Password'} name={'password'} component={FormControl} validate={[required]} type="password" /></div>
      <div><Field child="input" type={'checkbox'} name={'rememberMe'} component={FormControl} /></div>
      {props.captchaUrl &&  <img src={props.captchaUrl} alt='qq'/>}
      {props.captchaUrl &&  <div><Field child="input" placeholder={'Symbols from captcha'} name={'captcha'} component={FormControl} validate={[required]} type="text" /></div>}
      {props.error && <div className={styles.formSummaryError}>{props.error}</div>}
      <div><button>Login</button></div>
    </form>
  )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  }

  if (props.isAuth) {
    return <Navigate to="/profile" />
  }

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl = {props.captchaUrl} />
  </div>

}
const mapStateToProps = (state) => ({
  captchaUrl :state.auth.captchaUrl,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);