import { usersAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'



let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    fake: 10

}
const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FAKE': return { ...state, fake: state.fake + 1 }
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
                    : [state.followingInProgress.filter(id => id !== action.userId)]
            }


        default:                                                 // у action должно быть свойство currentPage
            return state;                                        // именно поєтому в AC должно быть currentPage                 
        // Делаем купию state и подменяем то свойство  которое надо подменить в этой копии                                                        
    }

}
//----------------
//ActionCreators
//-----------------
export const followSucces = (userId) => ({ type: FOLLOW, userId })//фигурные скобки в стрелочной ф-ии означает тело ф-ии но мы избавились от тела ф-ии. Это обьект, мы создали для этого нужно обернуть в круглые скобки
export const unfollowSucces = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage }) // Принимает текущую страницу которую нужно установить и будет возвращать обьект у которого в качестве типа
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount }) // будет SET_CURRENT_PAGE, а в качестве значения currentPage
export const toogleIsFetching = (isFetching) => ({ type: TOOGLE_IS_FETCHING, isFetching: isFetching })
export const toogleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: isFetching, userId })

// Thunks это ф-я которая диспатчит екшены внутри себя и делает асинхронную 

export const requestUsers = (currentPage, pageSize) => { // ф-я котороя может что то принимать и которая возвращает санку
    return async (dispatch) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        dispatch(toogleIsFetching(true));      // передаем параметры currentPage, pageSize и потом наша ф-я Санк может может к ним достучаться 
        dispatch(setCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toogleIsFetching(false));
        dispatch(setUsers(data.items))
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




export const follow = (userId) => { // ф-я котороя может что то принимать и которая возвращает санку
    return async (dispatch) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        dispatch(toogleFollowingProgress(true, userId));
        let response = await usersAPI.follow(userId);
        if (response.data.resultCode === 0) {
            dispatch(followSucces(userId));
        }
        dispatch(toogleFollowingProgress(false, userId));

    }
}

export const unfollow = (userId) => { // ф-я котороя может что то принимать и которая возвращает санку
    return async (dispatch) => {               // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        dispatch(toogleFollowingProgress(true, userId));
        let response = await usersAPI.unfollow(userId)
        if (response.data.resultCode === 0) {
            dispatch(unfollowSucces(userId));
        }
        dispatch(toogleFollowingProgress(false, userId));

    }
}

export default UsersReducer;