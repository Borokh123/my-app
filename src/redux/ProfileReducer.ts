import { FormAction, stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";
import { profile } from "console";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { AppStateType } from "./ReduxStore";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";


const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'



let initialState = {
    posts: [
        { id: 1, message: 'Hello!!', like: 5 },
        { id: 2, message: 'How are you?!', like: 6 },
        { id: 3, message: 'Nice to meet you!', like: 7 },
        { id: 4, message: 'How are you doing!', like: 8 },

    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null, // если null то это не объект, а если объект то это объект с данными профиля
    status: ''

}

export type InitialStateType = typeof initialState; // типизация начального состояния
const ProfileReducer = (state = initialState, action: any): InitialStateType => {
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

        case SAVE_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }; // as ProfileType - это приведение типа, мы говорим что это объект с типом ProfileType

        default:
            return state;
    }
}

type ActionsTypes = AddPostActionCreatorType | SetUserProfileActionType | SetStatusActionType | DeletePostActionType | SavePhotoSuccessActionType| FormAction; // объединяем типы экшенов в один тип
type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({ type: ADD_POST, newPostText })//фигурные скобки в стрелочной ф-ии означает тело ф-ии но мы избавились от тела ф-ии. Это обьект, мы создали для этого нужно обернуть в круглые скобки
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile }) //ActionCreator ф-я которая возвр обьект Action, Action это обьект в котором инкапсулированы все данные для того чтоб reducer получил этот action и применил изминения на state свой. 
type SetStatusActionType = {
type: typeof SET_STATUS
status: string
}
export const setStatus = (status:string):SetStatusActionType => ({ type: SET_STATUS, status }) //ActionCreator ф-я которая возвр обьект Action, Action это обьект в котором инкапсулированы все данные для того чтоб reducer получил этот action и применил изминения на state свой. 
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId:number
}
export const deletePost = (postId:number):DeletePostActionType => ({ type: DELETE_POST, postId })

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
//ActionCreator ф-я которая возвр обьект Action, Action это обьект в котором инкапсулированы все данные для того чтоб reducer получил этот action и применил изминения на state свой.
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })
// export const updateNewPostActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })

type GetStateType = () => AppStateType; // типизация getState
type DispatchType = Dispatch<ActionsTypes>; // типизация dispatch
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (userId:number):ThunkType =>  // ф-я котороя может что то принимать и которая возвращает санку
    async (dispatch, getState) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        const response = await profileAPI.getProfile(userId) // нужна переменная response мы ее создадим, в респонсе будет сидет результат которым зарезолвиться промис
        //or response
        dispatch(setUserProfile(response.data)) // or response.data

    }

export const getStatus = (userId:number | null):ThunkType =>  // ф-я котороя может что то принимать и которая возвращает санку
    async (dispatch) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        if (userId !== null) {
            const response = await profileAPI.getStatus(userId);
            dispatch(setStatus(response.data));
        }
    }

export const updateStatus = (status:string):ThunkType =>  // ф-я котороя может что то принимать и которая возвращает санку
    async (dispatch, getState) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }

export const savePhoto = (file:any):ThunkType =>  // ф-я котороя может что то принимать и которая возвращает санку
    async (dispatch, getState) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        const response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }

export const saveProfile = (profile:ProfileType):ThunkType =>  // ф-я котороя может что то принимать и которая возвращает санку
    async (dispatch, getState) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        const userId = getState().auth.userId;
        const response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === 0) {
            if (userId !== null) {
                dispatch(getUserProfile(userId));
            }
        }
        else {
            dispatch(stopSubmit('editProfile', { _error: response.data.messages[0] }));
            return Promise.reject(response.data.messages[0]);
            //dispatch(stopSubmit('editProfile', { "contacts" : {"facebook":response.data.messages[0]}  }));

        }
    }

export default ProfileReducer;