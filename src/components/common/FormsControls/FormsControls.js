import React from 'react'
import styles from './FormsControls.module.css'

export const FormControl = ({ input, meta, ...restProps }) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={styles.formControl + " " + (hasError ?  styles.error:'') }>
      
        <restProps.child {...restProps} {...input} {...meta} />

      {hasError && <span>{meta.error}</span>}
    </div>
  
  )
}

export default FormControl