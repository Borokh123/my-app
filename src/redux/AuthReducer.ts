import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";
import { type } from "os";


const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


export type InitialStateType2 = {
    userId: number | null   // id пользователя
    email: string | null   // почта пользователя                
    login: string | null   // логин пользователя
    isAuth: boolean // авторизован ли пользователь
    captchaUrl: string | null // url капчи
}

let initialState = {
    userId: null as number | null, // id пользователя
    email: null as string | null, // почта пользователя 
    login: null as string | null, // логин пользователя
    isAuth: false,
    captchaUrl: null as string | null // url капчи


}

export type InitialStateType = typeof initialState; // типизация начального состояния
const AuthReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {  //все данные которые нужны reducer для проеоброзования state, всегда лежат в actio  n
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:

            return {
              
                ...state,
                ...action.payload,
            }
        default:                                                 // у action должно быть свойство currentPage
            return state;                                        // именно поєтому в AC должно быть currentPage                 
        // Делаем купию state и подменяем то свойство  которое надо подменить в этой копии                                                        
    }

}
//----------------
//ActionCreators
//-----------------
type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA, // означает не строку, а значение переменной
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: { userId, login, email, isAuth }
})//фигурные скобки в стрелочной ф-ии означает тело ф-ии но мы избавились от тела ф-ии. Это обьект, мы создали для этого нужно обернуть в круглые скобки


type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string | null }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })//фигурные скобки в стрелочной ф-ии означает тело ф-ии но мы избавились от тела ф-ии. Это обьект, мы создали для этого нужно обернуть в круглые скобки

export const getAuthUserData = () => async (dispatch: any) => { // ф-я котороя может что то принимать и которая возвращает санку
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}


export const login = (email: string, password: string, rememberMe: boolean, captcha:null) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login',{ _error: message  }));
    }
}
export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));

}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }

}




export default AuthReducer;