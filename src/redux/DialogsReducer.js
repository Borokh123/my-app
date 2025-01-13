const ADD_MESSAGE = 'ADD-MESSAGE';
let initialState = {
    dialogs: [
        { id: 1, name: 'user 1' },
        { id: 2, name: 'user 2' },
        { id: 3, name: 'user 3' },
        { id: 4, name: 'user 4' },
        { id: 5, name: 'user 5' },
        { id: 6, name: 'user 6' }

    ],
    messages: [
        { id: 1, message: 'Message 1' },
        { id: 2, message: 'Message 2' },
        { id: 3, message: 'Message 3' },
        { id: 4, message: 'Message 4' },
        { id: 5, message: 'Message 5' },
        { id: 6, message: 'Message 6' }

    ]
}

const DialogsReducer = (state = initialState, action) => {

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
export const addMessageActionCreator = (newMessageBody) => {
    return {
        type: ADD_MESSAGE,
        newMessageBody
    }

}


export default DialogsReducer;
