const ADD_MESSAGE = 'ADD-MESSAGE';
type DialogsType = {
    id: number
    name: string
}
type MessagesType = {
    id:number
    message:string
}

let initialState = {
    dialogs: [
        { id: 1, name: 'user 1' },
        { id: 2, name: 'user 2' },
        { id: 3, name: 'user 3' },
        { id: 4, name: 'user 4' },
        { id: 5, name: 'user 5' },
        { id: 6, name: 'user 6' }

    ] as Array<DialogsType>,    // типизация массива объектов
    messages: [
        { id: 1, message: 'Message 1' },
        { id: 2, message: 'Message 2' },
        { id: 3, message: 'Message 3' },
        { id: 4, message: 'Message 4' },
        { id: 5, message: 'Message 5' },
        { id: 6, message: 'Message 6' }

    ] as Array<MessagesType>
}  // типизация массива объектов

export type InitialStateType = typeof initialState;

const DialogsReducer = (state = initialState, action:any): InitialStateType => {

    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = action.newMessageBody;
            return {
                ...state,          
                messages: [...state.messages, { id: 6, message: newMessage }]
            };

        }
       


        default:
            return state;
    }
}
export type addMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}
export const addMessageActionCreator = (newMessageBody:string):addMessageActionCreatorType => {
    return {
        type: ADD_MESSAGE,
        newMessageBody
    }

}


export default DialogsReducer;
