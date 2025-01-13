import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";


const SET_USER_DATA = 'SET_USER_DATA';




let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false

}
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {  //все данные которые нужны reducer для проеоброзования state, всегда лежат в actio  n
        case SET_USER_DATA:

            return {
                ...state,
                ...action.data,
            }
        default:                                                 // у action должно быть свойство currentPage
            return state;                                        // именно поєтому в AC должно быть currentPage                 
        // Делаем купию state и подменяем то свойство  которое надо подменить в этой копии                                                        
    }

}
//----------------
//ActionCreators
//-----------------
export const setAuthUserData = (userId, login, email, isAuth) => ({ type: SET_USER_DATA, data: { userId, login, email, isAuth } })//фигурные скобки в стрелочной ф-ии означает тело ф-ии но мы избавились от тела ф-ии. Это обьект, мы создали для этого нужно обернуть в круглые скобки

export const getAuthUserData = () => async (dispatch) => { // ф-я котороя может что то принимать и которая возвращает санку
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}


export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }));
    }
}

export const logout = (email, password, rememberMe) => async(dispatch) => {
    let response = await authAPI.logout(email, password, rememberMe);
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    
}




export default AuthReducer;