import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import FormControl, { createField, Input } from '../common/FormsControls/FormsControls'
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
      {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input, { type: 'text' })}
      {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, { type: 'password' })}
      {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' }, 'Remember me')}
      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl &&
        createField<LoginFormValuesTypeKeys>(
          'Symbols from captcha',
          'captcha',
          [required],
          Input,
          { type: 'text' }
        )}
      {/* <div><Field<LoginFormValuesTypeKeys> component={Input} placeholder={'Email'} name={'email'}  validate={[required]} type="text" /></div>
      <div><Field<LoginFormValuesTypeKeys> component={Input} placeholder={'Password'} name={'password'}  validate={[required]} type="password" /></div>
      <div><Field<LoginFormValuesTypeKeys> component={Input} type={'checkbox'} name={'rememberMe'}  /></div>
      {captchaUrl && <img src={captchaUrl} alt='qq' />}
      {captchaUrl && <div><Field<LoginFormValuesTypeKeys> component={Input} placeholder={'Symbols from captcha'} name={'captcha'}  validate={[required]} type="text" /></div>} */}
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

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;
// type LoginFormValuesTypeKeys = keyof LoginFormValuesType;

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