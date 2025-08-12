import { Dispatch } from "redux";
import { usersAPI } from "../api/api";
import { PhotosType, UserType } from "../types/types";
import { AppStateType, InferActionsTypes } from "./ReduxStore";
import { ThunkAction } from "redux-thunk";
// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
// const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
// const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 25,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // массив юзеров которые подписаны на юзера
};
export type InitialStateType = typeof initialState;
const UsersReducer = (
    state = initialState,
    action: ActionsTypes
): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                // users:[...state.users],
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true };
                    }
                    return u;
                }),
            };
        case "UNFOLLOW":
            return {
                ...state,
                // users:[...state.users],
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false };
                    }
                    return u;
                }),
            };
        case "SET_USERS":
            return { ...state, users: action.users }; // перезвтираем новыми юзерз которые пришли тоесть склеиваем два массива которые были в стейте и пришли в action
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.currentPage }; // перезвтираем новыми currentPage которые пришли тоесть склеиваем два массива которые были в стейте и пришли в action
        case "SET_TOTAL_USERS_COUNT":
            return { ...state, totalUsersCount: action.count };
        case "TOOGLE_IS_FETCHING":
            return { ...state, isFetching: action.isFetching };
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching //isFatching просто меняет знаечение на True
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId),
            };

        default: // у action должно быть свойство currentPage
            return state; // именно поєтому в AC должно быть currentPage
        // Делаем купию state и подменяем то свойство  котор'ое надо подменить в этой копии
    }
};
//----------------
//ActionCreators
//-----------------
type ActionsTypes = InferActionsTypes<typeof actions>; // InferActionsTypes - это утилита которая позволяет нам получить типы экшенов из обьекта actions
export const actions = {
    followSucces: (userId: number) => ({ type: "FOLLOW", userId } as const), //фигурные скобки в стрелочной ф-ии означает тело ф-ии но мы избавились от тела ф-ии. Это обьект, мы создали для этого нужно обернуть в круглые скобки
    unfollowSucces: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: "SET_USERS", users } as const),
    setCurrentPage: (currentPage: number) =>
        ({ type: "SET_CURRENT_PAGE", currentPage: currentPage } as const), // Принимает текущую страницу которую нужно установить и будет возвращать обьект у которого в качестве типа
    setTotalUsersCount: (totalUsersCount: number) =>
        ({ type: "SET_TOTAL_USERS_COUNT", count: totalUsersCount } as const), // будет SET_CURRENT_PAGE, а в качестве значения currentPage
    toogleIsFetching: (isFetching: boolean) =>
        ({ type: "TOOGLE_IS_FETCHING", isFetching: isFetching } as const),
    toogleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
        type: "TOGGLE_IS_FOLLOWING_PROGRESS",
        isFetching: isFetching,
        userId,
    } as const),
};

// ф-я которая диспатчит екшены внутри себя и делает асинхронную
type GetStateType = () => AppStateType; // типизация getState
type DispatchType = Dispatch<ActionsTypes>; // типизация dispatch
type ThunkType = ThunkAction<
    Promise<void>,
    AppStateType,
    unknown,
    ActionsTypes
>;

export const requestUsers = (
    currentPage: number,
    pageSize: number
): ThunkType => {
    // ф-я котороя может что то принимать и которая возвращает санку
    return async (dispatch, getState) => {
        // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        dispatch(actions.toogleIsFetching(true)); // передаем параметры currentPage, pageSize и потом наша ф-я Санк может может к ним достучаться
        dispatch(actions.setCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(actions.toogleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount)); // колбэки приходят из mapDispatch to props
    };
};

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

export const follow = (userId: number): ThunkType => {
    // ф-я котороя может что то принимать и которая возвращает санку
    return async (dispatch, getState) => {
        // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        dispatch(actions.toogleFollowingProgress(true, userId));
        let response = await usersAPI.follow(userId);
        if (response.data.resultCode === 0) {
            dispatch(actions.followSucces(userId));
        }
        dispatch(actions.toogleFollowingProgress(false, userId));
    };
};

export const unfollow = (userId: number): ThunkType => {
    // ф-я котороя может что то принимать и которая возвращает санку
    return async (dispatch, getState) => {
        // кто то снаружи вызовит санк криэйтор чтобы получить thunk
        dispatch(actions.toogleFollowingProgress(true, userId));
        let response = await usersAPI.unfollow(userId);
        if (response.data.resultCode === 0) {
            dispatch(actions.unfollowSucces(userId));
        }
        dispatch(actions.toogleFollowingProgress(false, userId));
    };
};

export default UsersReducer;
