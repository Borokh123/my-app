import React from 'react'
import { addMessageActionCreator, addMessageActionCreatorType } from '../../redux/DialogsReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose, Dispatch } from 'redux';
import { AppStateType } from '../../redux/ReduxStore';


type mapDispatchPropsType = {
  sendMessage: (newMessageBody: string) => void
}


let mapStateToProps = (state:AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch:Dispatch<addMessageActionCreatorType>):mapDispatchPropsType => {
  return {
    
    sendMessage: (newMessageBody:string) => {
      dispatch(addMessageActionCreator(newMessageBody));
    }
  }

}


// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent);
// export default DialogsContainer
export default compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)  //Возьми диалогс -> закинь в ф-ю withAuthRedirect -> получи результат и рез-тат закинь в connect(mapStateToProps, mapDispatchToProps) 
