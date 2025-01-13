import React from 'react'
import { addMessageActionCreator } from '../../redux/DialogsReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
  return {
    
    sendMessage: (newMessageBody) => {
      dispatch(addMessageActionCreator(newMessageBody));
    }
  }

}


// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent);
// export default DialogsContainer
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)  //Возьми диалогс -> закинь в ф-ю withAuthRedirect -> получи результат и рез-тат закинь в connect(mapStateToProps, mapDispatchToProps) 
