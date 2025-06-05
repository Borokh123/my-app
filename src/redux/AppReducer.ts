import { Dispatch } from "redux";
import { getAuthUserData } from "./AuthReducer";
import { AppStateType } from "./ReduxStore";
import { ThunkAction } from "redux-thunk";


const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';

export type InitialStateType = {
    initialized: boolean    // свойство которое будет хранить состояние инициализации приложения
}

let initialState:InitialStateType = {
    initialized: false,
    
    
};
const AppReducer = (state:InitialStateType = initialState, action:any):InitialStateType => { // InitialStateType это тип который возвращается и который мы получаем. Первое присваивание дает неявную типизаию, а второе возвращает типизацию прописывать обьязатедбно
    switch (action.type) {  //все данные которые нужны reducer для проеоброзования state, всегда лежат в actio  n
        case INITIALIZED_SUCCES:

            return {
                ...state,
                initialized: true
            }
        default:                                                 // у action должно быть свойство currentPage
            return state;                                        // именно поєтому в AC должно быть currentPage                 
        // Делаем купию state и подменяем то свойство  которое надо подменить в этой копии                                                        
    }

}
//----------------
//ActionCreators
//-----------------

type InitializedSuccesActionType = {
    type: typeof INITIALIZED_SUCCES // типизация action creator
}
export const initializedSucces = ():InitializedSuccesActionType => ({ type: INITIALIZED_SUCCES });//фигурные скобки в стрелочной ф-ии означает тело ф-ии но мы избавились от тела ф-ии. Это обьект, мы создали для этого нужно обернуть в круглые скобки
type GetStateType = () => AppStateType; // типизация getState
type DispatchType = Dispatch<InitializedSuccesActionType>; // типизация dispatch
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, InitializedSuccesActionType>
// export const initializeApp = ():ThunkType => (dispatch, getState) => { // ф-я котороя может что то принимать и которая возвращает санку
//     let promise = dispatch(getAuthUserData());
//    await Promise.all([promise]);
//     .then(() => {  //нужно убрать then
//     dispatch(initializedSucces());
//   });
// }

export const initializeApp = ():ThunkType => async (dispatch, getState) => { // ф-я котороя может что то принимать и которая возвращает санку
    let promise = dispatch(getAuthUserData());
    await Promise.all([promise]);
    dispatch(initializedSucces());
}



export default AppReducer;