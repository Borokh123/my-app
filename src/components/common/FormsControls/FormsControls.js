import React, { ComponentType } from 'react'
import styles from './FormsControls.module.css'


export const FormControl = ({
  input,
  meta,
  component: Component,
  ...restProps
}=> {
  const hasError = meta.touched && meta.error

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
      <Component {...input} {...restProps} />
      {hasError && <span>{meta.error}</span>}
    </div>
  )
}

export default FormControl