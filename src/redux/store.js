import DialogsReducer from "./DialogsReducer";
import ProfileReducer from "./PofileReducer";
import SideBarReducer from "./SideBarReducer";
let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hello', like: '5' },
                { id: 2, message: 'How are you', like: '6' },
                { id: 3, message: 'Nice to meet you', like: '7' },
                { id: 4, message: 'How are you doing', like: '8' },
                { id: 5, message: 'Never mind', like: '9' },
                { id: 6, message: 'Its up to you', like: '10' }
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
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

            ],
            newMessageText: 'it-kamasutra.com'

        },

        sideBar: {
            friends: [
                { id: 1, name: 'User 1', imgSrc: 'https://cdn.iz.ru/sites/default/files/styles/1920x1080/public/article-2022-12/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202022-12-14%20%D0%B2%2021.33.12.png.jpg?itok=oY07F9bQ' },
                { id: 2, name: 'User 2', imgSrc: 'https://pbs.twimg.com/media/GPrpm6fWMAA5G7r?format=jpg&name=large' },
                { id: 3, name: 'User 3', imgSrc: 'https://pbs.twimg.com/media/FqnhvIoXwAEHUL8?format=jpg&name=900x900' },

            ]

        }

    },
    _callSubscriber() {
        console.log('state is changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = ProfileReducer(this._state.profilePage, action);
        this._state.dialogsPage = DialogsReducer(this._state.dialogsPage, action);
        this._state.sideBar = SideBarReducer(this._state.sideBar, action);
        this._callSubscriber(this._state);
    }
}




























export default store;
window.store = store;