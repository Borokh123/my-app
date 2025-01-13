import React from 'react'
import styles from './FormsControls.module.css'

export const FormControl = ({ input, meta, ...restProps }) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={styles.formControl + " " + (hasError ?  styles.error:'') }>
      <div>
        <restProps.child {...restProps} {...input} {...meta} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  
  )
}

export default FormControl