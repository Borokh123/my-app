import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Navigate } from 'react-router-dom'

import { AddMessageFormRedux } from './AddMessageForm'


const Dialogs = (props) => {

  let state = props.dialogsPage;
  let newMessageElement = React.createRef();

  let addNewMessage = (formData) => {
    // из name Filed
    props.sendMessage(formData.newMessageBody)
  }
  if (!props.isAuth) return <Navigate to={"/login"} />
  let dialogsElements = state.dialogs.map((d) => <DialogItem name={d.name} id={d.id} />)
  let messagesElement = state.messages.map((m) => <Message message={m.message} id={m.id} />)
  debugger;
  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messagesElement}
        <AddMessageFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  )
}

export default Dialogs