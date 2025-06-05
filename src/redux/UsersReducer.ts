import { Dispatch } from "redux";
import { usersAPI } from "../api/api";
import { PhotosType, UserType } from "../types/types";
import { AppStateType } from "./ReduxStore";
import { ThunkAction } from "redux-thunk";
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 25,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // массив юзеров которые подписаны на юзера


}
export type InitialStateType = typeof initialState;
const UsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users:[...state.users],
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;

                })
            }
        case UNFOLLOW:
            return {
                ...state,
                // users:[...state.users],
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS:
            return { ...state, users: action.users } // перезвтираем новыми юзерз которые пришли тоесть склеиваем два массива которые были в стейте и пришли в action
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }   // перезвтираем новыми currentPage которые пришли тоесть склеиваем два массива которые были в стейте и пришли в action
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.count }
        case TOOGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.isFetching //isFatching просто меняет знаечение на True
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
                    
            }   


        default:                                                 // у action должно быть свойство currentPage
            return state;                                        // именно поєтому в AC должно быть currentPage                 
        // Делаем купию state и подменяем то свойство  которое надо подменить в этой копии                                                        
    }

}
//----------------
//ActionCreators
//-----------------
type ActionsTypes = FollowSuccessActionType | unfollowSuccesActionType | setUsersActionType | setCurrentPageActionType | setTotalUsersCountActionType | toogleIsFetchingActionType | toogleFollowingProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSucces = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId })//фигурные скобки в стрелочной ф-ии означает тело ф-ии но мы избавились от тела ф-ии. Это обьект, мы создали для этого нужно обернуть в круглые скобки
type unfollowSuccesActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSucces = (userId: number): unfollowSuccesActionType => ({ type: UNFOLLOW, userId })
type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): setUsersActionType => ({ type: SET_USERS, users })
type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage: currentPage }) // Принимает текущую страницу которую нужно установить и будет возвращать обьект у которого в качестве типа
type setTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount }) // будет SET_CURRENT_PAGE, а в качестве значения currentPage
type toogleIsFetchingActionType = {
    type: typeof TOOGLE_IS_FETCHING
    isFetching: boolean
}
export const toogleIsFetching = (isFetching: boolean): toogleIsFetchingActionType => ({ type: TOOGLE_IS_FETCHING, isFetching: isFetching })
type toogleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toogleFollowingProgress = (isFetching: boolean, userId: number): toogleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: isFetching, userId })

// Thunks это ф-я которая диспатчит екшены внутри себя и делает асинхронную 
type GetStateType = () => AppStateType; // типизация getState
type DispatchType = Dispatch<ActionsTypes>; // типизация dispatch
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (currentPage: number, pageSize: number):ThunkType => { // ф-я котороя может что то принимать и которая возвращает санку
    return async (dispatch, getState) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        dispatch(toogleIsFetching(true));      // передаем параметры currentPage, pageSize и потом наша ф-я Санк может может к ним достучаться 
        dispatch(setCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toogleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount)) // колбэки приходят из mapDispatch to props
    }
}

// const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
//     dispatch(toogleFollowingProgress(true, userId));
//     let response = await apiMethod(userId);
//     if (response.data.resultCode === 0) {
//         dispatch(actionCreator(userId));
//     }
//     dispatch(toogleFollowingProgress(false, userId));
// }

// export const follow = (userId) => { // ф-я котороя может что то принимать и которая возвращает санку
//     return async (dispatch) => {
//         followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSucces);
//     }
// }

// export const unfollow = (userId) => { // ф-я котороя может что то принимать и которая возвращает санку
//     return async (dispatch) => {
//         followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSucces);
//     }
// }




export const follow = (userId: number):ThunkType => { // ф-я котороя может что то принимать и которая возвращает санку
    return async (dispatch, getState) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        dispatch(toogleFollowingProgress(true, userId));
        let response = await usersAPI.follow(userId);
        if (response.data.resultCode === 0) {
            dispatch(followSucces(userId));
        }
        dispatch(toogleFollowingProgress(false, userId));

    }
}

export const unfollow = (userId: number):ThunkType => { // ф-я котороя может что то принимать и которая возвращает санку
    return async (dispatch, getState) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        dispatch(toogleFollowingProgress(true, userId));
        let response = await usersAPI.unfollow(userId)
        if (response.data.resultCode === 0) {
            dispatch(unfollowSucces(userId));
        }
        dispatch(toogleFollowingProgress(false, userId));

    }
}

export default UsersReducer;