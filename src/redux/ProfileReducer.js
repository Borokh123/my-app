import { profileAPI, usersAPI } from "../api/api";


const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [
        { id: 1, message: 'Hello', like: '5' },
        { id: 2, message: 'How are you', like: '6' },
        { id: 3, message: 'Nice to meet you', like: '7' },
        { id: 4, message: 'How are you doing', like: '8' },

    ],
    // newPostText: 'it-kamasutra.com',
    profile: null,
    status: ''

}
const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                like: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],

            };


        }

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };


        case SET_USER_PROFILE:
            return { ...state, profile: action.profile };


        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id !== action.postId) };

        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })//фигурные скобки в стрелочной ф-ии означает тело ф-ии но мы избавились от тела ф-ии. Это обьект, мы создали для этого нужно обернуть в круглые скобки
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile }) //ActionCreator ф-я которая возвр обьект Action, Action это обьект в котором инкапсулированы все данные для того чтоб reducer получил этот action и применил изминения на state свой. 
export const setStatus = (status) => ({ type: SET_STATUS, status }) //ActionCreator ф-я которая возвр обьект Action, Action это обьект в котором инкапсулированы все данные для того чтоб reducer получил этот action и применил изминения на state свой. 
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
// export const updateNewPostActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })

export const getUserProfile = (userId) =>  // ф-я котороя может что то принимать и которая возвращает санку
    async (dispatch) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        const response = await profileAPI.getProfile(userId) // нужна переменная response мы ее создадим, в респонсе будет сидет результат которым зарезолвиться промис
        //or response
        dispatch(setUserProfile(response.data)) // or response.data

    }

export const getStatus = (userId) =>  // ф-я котороя может что то принимать и которая возвращает санку
    async (dispatch) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        const response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
    }

export const updateStatus = (status) =>  // ф-я котороя может что то принимать и которая возвращает санку
    async (dispatch) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }

export default ProfileReducer;