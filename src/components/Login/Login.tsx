import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import FormControl from '../common/FormsControls/FormsControls'
import { connect } from 'react-redux'
import { login } from '../../redux/AuthReducer'
import { Navigate } from 'react-router-dom'
import styles from '../common/FormsControls/FormsControls.module.css'
import { AppStateType } from '../../redux/ReduxStore'

type LoginFormOwnPropsType = {
  captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({ handleSubmit, error, captchaUrl }) => {

  return (
    <form onSubmit={handleSubmit}>
      <div><Field child="input" placeholder={'Email'} name={'email'} component={FormControl} validate={[required]} type="text" /></div>
      <div><Field child="input" placeholder={'Password'} name={'password'} component={FormControl} validate={[required]} type="password" /></div>
      <div><Field child="input" type={'checkbox'} name={'rememberMe'} component={FormControl} /></div>
      {captchaUrl && <img src={captchaUrl} alt='qq' />}
      {captchaUrl && <div><Field child="input" placeholder={'Symbols from captcha'} name={'captcha'} component={FormControl} validate={[required]} type="text" /></div>}
      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div><button>Login</button></div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({ form: 'login' })(LoginForm)
type mapStateToPropsType = {
  captchaUrl: string | null
  isAuth: boolean
}
type mapDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}
type LoginFormValuesType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string| null
}
const Login: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {
  const onSubmit = (formData: any) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  }

  if (props.isAuth) {
    return <Navigate to="/profile" />
  }

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
  </div>

}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);