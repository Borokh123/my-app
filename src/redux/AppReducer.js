import { getAuthUserData } from "./AuthReducer";


const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';

let initialState = {
    initialized: false
    
};
const AppReducer = (state = initialState, action) => {
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
export const initializedSucces = () => ({ type: INITIALIZED_SUCCES });//фигурные скобки в стрелочной ф-ии означает тело ф-ии но мы избавились от тела ф-ии. Это обьект, мы создали для этого нужно обернуть в круглые скобки

export const initializeApp = () => (dispatch) => { // ф-я котороя может что то принимать и которая возвращает санку
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
    .then(() => {
    dispatch(initializedSucces());
    });
}





export default AppReducer;