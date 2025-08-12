import { Field, reduxForm } from 'redux-form'
import s from './Dialogs.module.css'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import FormControl, { createField, Textarea } from '../common/FormsControls/FormsControls';
const maxLength50 = maxLengthCreator(50);
const AddMessageForm = (props) => {
  console.log("handleSubmit в AddMessageForm:", props.handleSubmit);

    return (
      <form onSubmit={props.handleSubmit} className={s.newMessage}>
{createField(
      'Enter your message', // placeholder
        'newMessageBody', // name
        [required, maxLength50], // validators
        Textarea, // component
        { className: s.addMessage } // additional props
      )}
        {/* <Field class={s.addMessage} component={Textarea}   validate = {[required, maxLength50]} name = "newMessageBody" placeholder="Enter your message"/> */}
        {/* <textarea onChange={onMessageChange} ref={newMessageElement} value={state.newMessageText} /> */}
     
      <div className={s.textTypeBtn}><button>Send</button></div>
    </form>   
    )
   
  }
  
  export const AddMessageFormRedux = reduxForm({form:"dialogAddMessageForm"}) (AddMessageForm)
