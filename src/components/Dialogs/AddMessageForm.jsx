import { Field, reduxForm } from 'redux-form'
import s from './Dialogs.module.css'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import FormControl from '../common/FormsControls/FormsControls';
const maxLength50 = maxLengthCreator(50);
const AddMessageForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit} className={s.newMessage}>
      <div className={s.textType}>
        <Field child = 'textarea' component={FormControl}  validate = {[required, maxLength50]} name = "newMessageBody" placeholder="Enter your message"/>
        {/* <textarea onChange={onMessageChange} ref={newMessageElement} value={state.newMessageText} /> */}
      </div>
      <div className={s.textTypeBtn}><button>Send</button></div>
    </form>   
    )
   
  }
  
  export const AddMessageFormRedux = reduxForm({form:"dialogAddMessageForm"}) (AddMessageForm)